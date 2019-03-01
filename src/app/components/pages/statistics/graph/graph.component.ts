import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../../../shared/repository/data-source.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  constructor(private dataSource: DataSourceService) { }

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasWrapper: HTMLDivElement;
  canvasWidth: number;
  canvasHeight: number;
  data = [];

  static getValueOrNull(index: number, array) {
    if (index < array.length) {
      return array[index];
    } else {
      return null;
    }
  }

  static timeFormat(second: number): string {
    return Math.floor(second / 60).toString(); // + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  static toTwoDigit(value: number): string {
    return value >= 10 ? value.toString() : '0' + value;
  }

  static getDayAndMonth(date: Date): string {
    return GraphComponent.toTwoDigit(date.getDate()) + '/' + GraphComponent.toTwoDigit(date.getMonth() + 1);
  }

  static drawBigText(line: string, x: number, y: number, ctx: CanvasRenderingContext2D) {
    const oldFillStyle = ctx.fillStyle;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    GraphComponent.drawText(line, x, y, ctx);
    ctx.fillStyle = oldFillStyle;
  }

  static drawText(line: string, x: number, y: number, ctx: CanvasRenderingContext2D) {
    ctx.translate(0, ctx.canvas.height);
    ctx.scale(1, -1);
    ctx.fillText(line, x, ctx.canvas.height - y);
    ctx.scale(1, -1);
    ctx.translate(0, -ctx.canvas.height);
  }

  static addMissedData(inData: Array<{ date: Date, value: number }>): Array<{ date: Date, value: number }> {
    if (inData.length === 0) {
      return [];
    }
    const data = inData.slice();

    const maxDate = data.reduce<Date>((previousValue, currentValue) => {
      return previousValue > currentValue.date ? previousValue : currentValue.date;
    }, new Date(data[0].date));

    const minDate = data.reduce<Date>((previousValue, currentValue) => {
      return previousValue < currentValue.date ? previousValue : currentValue.date;
    }, new Date(data[0].date));

    for (const i = new Date(minDate); i < maxDate; i.setDate(i.getDate() + 1)) {
      const result = data.filter(value1 => {
        return value1.date.getDate() === i.getDate()
          && value1.date.getMonth() === i.getMonth()
          && value1.date.getFullYear() === i.getFullYear();
      });
      if (result.length === 0) {
        data.push({date: new Date(i), value: 0});
      }
    }
    data.sort((a, b) => a.date === b.date ? 0 : (a.date > b.date ? 1 : -1));
    return data;
  }

  ngOnInit() {
    this.dataSource.getStatisticsForDays()
      .subscribe(value => {
        this.data = value.map(item => ({date: new Date(item.date), value: item.day_result}));
        this.data = GraphComponent.addMissedData(this.data);
        this.setupCanvas();
      });
  }

  setupCanvas() {
    this.canvasWrapper = document.getElementById('canvas_wrapper') as HTMLDivElement;
    this.canvas = document.getElementById('graph_canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    this.canvas.style.width = this.canvasWrapper.offsetWidth - 100 + 'px';
    this.canvasWidth = this.canvasWrapper.offsetWidth;
    this.canvas.style.width = this.canvasWidth + 'px';
    this.canvas.style.height = 200 + 'px';

    this.canvas.width = this.canvasWrapper.offsetWidth * 3;
    this.canvas.height = 200 * 3;
    this.canvasHeight = 200;

    this.context.scale(3, -3);
    this.context.translate(0, -this.canvasHeight);
    this.updateCanvas(this.context);
  }

  resizeCanvas(event) {
    try {
      this.canvas.style.width = 200 + 'px';
      this.canvasWidth = this.canvasWrapper.offsetWidth;
      this.canvas.style.width = this.canvasWidth + 'px';

      this.canvas.width = this.canvasWrapper.offsetWidth * 3;

      this.context.scale(3, -3);
      this.context.translate(0, -this.canvasHeight);
      this.context.clearRect(0, 0, this.context.canvas.height, this.context.canvas.width);
      this.updateCanvas(this.context);
    } catch (e) {
      console.error(e);
    }

  }

  updateCanvas(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    const highestValue = Math.floor(1.2 * this.data.reduce<number>(
      (previousValue, currentValue) => Math.max(previousValue, currentValue.value),
      0
    ));
    const fr = Math.floor(this.canvasWidth / this.data.length);

    ctx.beginPath();
    const yfr = 5;
    for (let i = 1; i < yfr; i++) {
      ctx.moveTo(0, this.canvasHeight * (i / yfr));
      ctx.lineTo(this.canvasWidth, this.canvasHeight * (i / yfr));
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    this.data.forEach((value, index) => {
      ctx.moveTo(index * fr, 0);
      ctx.lineTo(index * fr, this.canvasHeight);

      const xTranslate = index * fr + 2 + 2;
      const r = Math.cos(45 * Math.PI / 180);
      ctx.translate(xTranslate, 0);
      ctx.rotate(r);
      GraphComponent.drawText(GraphComponent.getDayAndMonth(value.date), 0, 0, ctx);
      ctx.rotate(-r);
      ctx.translate(-xTranslate, 0);

    });
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.lineWidth = 3;
    const oldFont = ctx.font;
    ctx.font = '12px Arial';
    this.data.forEach((value, index) => {
      const rValue = (value.value / highestValue);
      ctx.lineTo(index * fr, this.canvasHeight * rValue);
    });
    ctx.stroke();

    for (let i = 0; i < this.data.length; i++) {
      const current = this.data[i];
      const rValue = (current.value / highestValue);
      const xp = i * fr;
      const yp = this.canvasHeight * rValue;
      const timeLine = GraphComponent.timeFormat(this.data[i].value);
      const next = GraphComponent.getValueOrNull(i + 1, this.data);

      if (Number(current.value) === 0) {
        continue;
      }

      if (next && Number(next.value) > Number(current.value)) {
        ctx.fillRect(xp, yp - (12 + 4), ctx.measureText(timeLine).width + 8, 12 + 4);
        GraphComponent.drawBigText(timeLine, xp + 4, yp + 4 - 16, ctx);
      } else {
        ctx.fillRect(xp, yp, ctx.measureText(timeLine).width + 8, 12 + 4);
        GraphComponent.drawBigText(timeLine, xp + 4, yp + 4, ctx);
      }
    }
    ctx.lineWidth = 1;
    ctx.font = oldFont;
  }
}
