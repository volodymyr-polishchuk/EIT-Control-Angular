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
  fromDateFormatedLine: string;
  toDateFormatedLine: string;

  static timeFormat(second: number) {
    return Math.floor(second / 60) + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  ngOnInit() {
    // this.fromDateFormatedLine = ResultItemComponent.timeFormat(Math.floor(this.lessonInHistory.dateStart.getTime() / 1000));
    // this.toDateFormatedLine = ResultItemComponent.timeFormat(Math.floor(this.lessonInHistory.dateEnd.getTime() / 1000));
  }
}
