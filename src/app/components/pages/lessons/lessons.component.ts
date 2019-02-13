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
    this.dataSource.getActiveLessons()
      .subscribe((value: Array<{lessonID: string, lessonName: string, themeName: string, timeToNowDiff: string}>) => {
        this.lessons = value.map((it) =>
          ({
            id: it.lessonID,
            name: it.lessonName,
            topic: {key: '-1', name: it.themeName},
            timeToNowDifference: Number(it.timeToNowDiff)
          })
        );
        this.loadLessons = true;
      });
  }

  createLesson(event: Lesson): void {
    this.dataSource.startLesson({key: '-1', name: event.name}, event.topic)
      .subscribe(value => console.log(value));
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
