import {Component, OnInit} from '@angular/core';
import {Lesson} from '../../shared/models/lesson';
import {Subject} from '../../shared/models/subject';
import {InMemoryDataSourceService} from '../../shared/repository/in-memory-data-source.service';
import {DataSourceService} from '../../shared/repository/data-source.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons: Array<Lesson> = [];
  subjectsForHint: Array<Subject> = [];
  loadLessons = false;
  subjectForHintLoad = false;
  constructor(private memoryDataSource: InMemoryDataSourceService,
              private dataSource: DataSourceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource.getSubjectThatNotLearnYesterday()
      .subscribe((value) => {
        this.subjectsForHint = value.map<Subject>(item => ({key: '-1', name: item.subjectName}));
        this.subjectForHintLoad = true;
      });
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
      }, error => {
        console.error(error);
      }, () => {
        this.updateActiveLessonsList();
      });
  }

  successfulLesson(lesson: Lesson): void {
    this.dataSource.endLesson(lesson).subscribe((value: number) => {
      console.log(value);
      this.updateActiveLessonsList();
      this.snackBar.open('Заняття успішно збережене', 'Закрити', { duration: 3000 });
    }, (error: string) => {
      console.log(error);
    });
    console.log(lesson);
  }

  deleteLesson(lesson: Lesson): void {
    this.dataSource.cancelLesson(lesson).subscribe((value: number) => {
      console.log(value);
      this.updateActiveLessonsList();
      this.snackBar.open('Заняття успішно видалене', 'Закрити', { duration: 3000 });
    });
  }

}
