import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../../../shared/repository/data-source.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasWrapper: HTMLDivElement;
  canvasWidth: number;
  canvasHeight: number;
  data = [
    {
      date: new Date(2019, 2, 20),
      value: 1000
    },
    {
      date: new Date(2019, 2, 21),
      value: 2000
    },
    {
      date: new Date(2019, 2, 22),
      value: 1500
    },
    {
      date: new Date(2019, 2, 23),
      value: 500
    },
    {
      date: new Date(2019, 2, 23),
      value: 2000
    },
    {
      date: new Date(2019, 2, 23),
      value: 1700
    },
    {
      date: new Date(2019, 2, 23),
      value: 2300
    },
  ];
  constructor(private dataSource: DataSourceService) { }

  ngOnInit() {
    this.dataSource.getStatisticsForDays()
      .subscribe(value => {
        this.data = value.map(item => ({date: new Date(item.date), value: item.day_result}));
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
    this.canvas.style.width = 200 + 'px';
    this.canvasWidth = this.canvasWrapper.offsetWidth;
    this.canvas.style.width = this.canvasWidth + 'px';

    this.canvas.width = this.canvasWrapper.offsetWidth * 3;

    this.context.scale(3, -3);
    this.context.translate(0, -this.canvasHeight);
    this.context.clearRect(0, 0, this.context.canvas.height, this.context.canvas.width);
    this.updateCanvas(this.context);
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
    ctx.moveTo(0, 0);
    for (let i = 1; i < yfr; i++) {
      ctx.moveTo(0, this.canvasHeight * (i / yfr));
      ctx.lineTo(10, this.canvasHeight * (i / yfr));
      ctx.lineTo(this.canvasWidth, this.canvasHeight * (i / yfr));
      // this.drawText(Math.floor(highestValue * (i / yfr)).toString(), 0, this.canvasHeight * (i / yfr) + 4, ctx);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    const xfr = this.data.length;
    ctx.moveTo(0, 0);
    for (let i = 0; i < xfr; i++) {
      ctx.moveTo(i * fr, 0);
      ctx.lineTo(i * fr, this.canvasHeight);
      this.drawText(this.getDayAndMonth(this.data[i].date), this.canvasWidth * (i / xfr) + 4, 0, ctx);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.lineWidth = 3;
    ctx.font = '12px Arial';
    for (let i = 0; i < this.data.length; i++) {
      const rValue = (this.data[i].value / highestValue);
      const xp = i * fr;
      const yp = this.canvasHeight * rValue;
      ctx.lineTo(xp, yp);
    }
    ctx.stroke();
    for (let i = 0; i < this.data.length; i++) {
      const rValue = (this.data[i].value / highestValue);
      const xp = i * fr;
      const yp = this.canvasHeight * rValue;
      const timeLine = this.timeFormat(this.data[i].value);
      ctx.fillStyle = 'rgb(255, 255, 255)';

      if (this.getValueOrNull(i + 1, this.data) && this.getValueOrNull(i + 1, this.data).value > this.data[i].value) {
        ctx.fillRect(xp, yp - (12 + 4), ctx.measureText(timeLine).width + 8, 12 + 4);
        const oldFillStyle = ctx.fillStyle;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        this.drawText(timeLine, xp + 4, yp + 4 - 16, ctx);
        ctx.fillStyle = oldFillStyle;
      } else {
        ctx.fillRect(xp, yp, ctx.measureText(timeLine).width + 8, 12 + 4);
        const oldFillStyle = ctx.fillStyle;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        this.drawText(timeLine, xp + 4, yp + 4, ctx);
        ctx.fillStyle = oldFillStyle;
      }
    }
    ctx.lineWidth = 1;
    ctx.font = '11px';
  }

  getValueOrNull(index: number, array) {
    if (index < array.length) {
      return array[index];
    } else {
      return null;
    }
  }

  timeFormat(second: number): string {
    return Math.floor(second / 60) + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  getDayAndMonth(date: Date): string {
    return this.toTwoDigit(date.getDate()) + '/' + this.toTwoDigit(date.getMonth() + 1);
  }

  toTwoDigit(value: number): string {
    return value >= 10 ? value.toString() : '0' + value;
  }

  drawText(line: string, x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.context.translate(0, this.canvasHeight);
    ctx.scale(1, -1);
    ctx.fillText(line, x, this.canvasHeight - y);
    ctx.scale(1, -1);
    this.context.translate(0, -this.canvasHeight);
  }
}
