import {Component, Input, OnInit} from '@angular/core';
import {LessonInHistory} from '../../../../shared/models/lesson_in_history';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {
  constructor() { }

  @Input() lessonInHistory: LessonInHistory;
  fromDateFormattedLine: string;
  toDateFormattedLine: string;

  static timeFormat(second: number) {
    return Math.floor(second / 60) + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  static toTwoDigit(value: number): string {
    return value < 10 ? '0' + value : String(value);
  }

  ngOnInit() {
    this.fromDateFormattedLine = ResultItemComponent.timeFormat(Math.floor(this.lessonInHistory.dateStart.getTime() / 1000));
    this.toDateFormattedLine = ResultItemComponent.timeFormat(Math.floor(this.lessonInHistory.dateEnd.getTime() / 1000));
  }

  getStartTime(): string {
    if (this.lessonInHistory.dateStart.getTime()) {
      return this.lessonInHistory.dateStart.toLocaleTimeString('uk', { hour: 'numeric', minute: 'numeric' });
    } else {
      return '--:--';
    }
  }

  getEndTime(): string {
    if (this.lessonInHistory.dateEnd.getTime()) {
      return this.lessonInHistory.dateEnd.toLocaleTimeString('uk', { hour: 'numeric', minute: 'numeric' });
    } else {
      return '--:--';
    }
  }

  getDate(): string {
    if (this.lessonInHistory.dateStart.getTime()) {
      return this.lessonInHistory.dateStart.toLocaleString('uk', {year: 'numeric', month: 'long', day: 'numeric'});
    } else {
      return '--.--.----';
    }
  }

  getSum(): string {
    if (this.lessonInHistory.dateStart.getTime() && this.lessonInHistory.dateEnd.getTime()) {
      return ResultItemComponent.timeFormat(
        Math.floor((this.lessonInHistory.dateEnd.getTime() - this.lessonInHistory.dateStart.getTime()) / 1000)
      );
    } else {
      return ResultItemComponent.timeFormat(this.lessonInHistory.time);
    }
  }
}
