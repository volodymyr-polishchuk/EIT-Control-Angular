import { Component, OnInit } from '@angular/core';
import {Lesson} from '../../shared/models/lesson';
import {Subject} from '../../shared/models/subject';
import {InMemoryDataSourceService} from '../../shared/repository/in-memory-data-source.service';
import {DataSourceService} from '../../shared/repository/data-source.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons: Array<Lesson> = [];
  subjectsForHint: Array<Subject> = [];
  loadLessons = false;
  constructor(private memoryDataSource: InMemoryDataSourceService, private dataSource: DataSourceService) { }

  ngOnInit() {
    this.subjectsForHint = this.memoryDataSource.getAllSubject();
    this.updateActiveLessonsList();
  }

  updateActiveLessonsList(): void {
    this.dataSource.getActiveLessons()
      .subscribe((value: Array<{lessonID: string, lessonName: string, themeName: string, timeToNowDiff: string}>) => {
        this.lessons = value.map((it) =>
          ({
            id: it.lessonID,
            name: it.lessonName,
            topic: { key: '-1', name: it.themeName },
            timeToNowDifference: Number(it.timeToNowDiff),
            subject: { key: '0', name: it.lessonName }
          })
        );
        this.loadLessons = true;
      });
  }

  createLesson(event: Lesson): void {
    this.dataSource.startLesson(event.subject, event.topic)
      .subscribe(value => {
        console.log(value);
        this.updateActiveLessonsList();
      });
  }

  successfulLesson(lesson: Lesson): void {
    console.log(lesson);
  }

  deleteLesson(lesson: Lesson): void {
    console.log(lesson);
  }

}
