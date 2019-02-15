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
  createTimerTime: Date;
  timeLine = '0:00';
  updateTimer: Object;
  static timeFormat(second: number) {
    return Math.floor(second / 60) + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  ngOnInit() {
    this.createTimerTime = new Date();
    this.updateTimerFn();
    this.updateTimer = setInterval(this.updateTimerFn.bind(this), 1000);
  }

  updateTimerFn() {
    const time = Math.floor((new Date().getTime() - this.createTimerTime.getTime()) / 1000);
    this.timeLine = LessonItemComponent.timeFormat(this.lesson.timeToNowDifference + time);
  }

  successfulLesson() {
    this.successful.emit(this.lesson);
  }

  deleteLesson() {
    if (confirm('Ви точно бажаєте відмінити заняття?\nВідновити інформацію не можливо')) {
      this.delete.emit(this.lesson);
    }
  }

}
