import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lesson} from '../../../shared/models/lesson';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css']
})
export class LessonItemComponent implements OnInit {
  constructor() { }

  @Input() lesson: Lesson;
  @Output() successful = new EventEmitter<Lesson>();
  @Output() delete = new EventEmitter<Lesson>();
  timeLine = '0:00';
  updateTimer: Object;
  static timeFormat(second) {
    return Math.floor(second / 60) + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  ngOnInit() {
    this.updateTimer = setInterval(this.updateTimerFn.bind(this), 1000);
  }

  updateTimerFn() {
    const ms = new Date().getTime() - this.lesson.timeToNowDifference;
    this.timeLine = LessonItemComponent.timeFormat(Math.floor(ms / 1000));
  }

  successfulLesson() {
    this.successful.emit(this.lesson);
  }

  deleteLesson() {
    this.delete.emit(this.lesson);
  }

}
