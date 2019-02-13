import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '../../../shared/models/lesson';

@Component({
  selector: 'app-active-lessons',
  templateUrl: './active-lessons.component.html',
  styleUrls: ['./active-lessons.component.css']
})
export class ActiveLessonsComponent {

  @Input() lessons: Array<Lesson> = [];
  @Input() loadData: boolean;
  @Output() successfulLesson = new EventEmitter<Lesson>();
  @Output() deleteLesson = new EventEmitter<Lesson>();

}
