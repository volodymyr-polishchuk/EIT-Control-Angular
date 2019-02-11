import { Component, OnInit } from '@angular/core';
import {Lesson} from '../../shared/models/lesson';
import {Subject} from '../../shared/models/subject';
import {InMemoryDataSourceService} from '../../shared/repository/in-memory-data-source.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons: Array<Lesson> = [];
  subjectsForHint: Array<Subject> = [];
  constructor(private memoryDataSource: InMemoryDataSourceService) { }

  ngOnInit() {
    this.subjectsForHint = this.memoryDataSource.getAllSubject();
  }

  createLesson(event: Lesson): void {
    console.log(event);
    this.lessons.push(event);
  }

  successfulLesson(lesson: Lesson): void {
    console.log(lesson);
  }

  deleteLesson(lesson: Lesson): void {
    console.log(lesson);
  }

}
