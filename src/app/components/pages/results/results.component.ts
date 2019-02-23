import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../../shared/repository/data-source.service';
import {LessonInHistory} from '../../shared/models/lesson_in_history';
import {Subject} from '../../shared/models/subject';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  subjects: Array<Subject> = [];
  foundedLessonsInHistory: Array<LessonInHistory> = [];
  constructor(private dataSource: DataSourceService, private snackBar: MatSnackBar) { }

  static parseDate(value: string): Date {
    const date = new Date(value);
    if (date.getTime()) {
      return date;
    } else {
      const t = value.split(/[- :]/).map(i => Number(i));
      try {
        return new Date(Date.UTC(Number(t[0]), t[1] - 1, t[2], t[3], t[4], t[5]));
      } catch (e) {
        return new Date(Number.NaN);
      }
    }
  }

  ngOnInit() {
    this.subjects = JSON.parse(localStorage.getItem('subjects'));
    this.subjects.unshift({key: '0', name: 'Всі предмети'});
    this.dataSource.getAllSubject().subscribe(
      (next: Array<{k: string; name: string}>) => {
        this.subjects = next.map((item) => ({key: item.k, name: item.name}));
        localStorage.setItem('subjects', JSON.stringify(this.subjects));
        this.subjects.unshift({key: '0', name: 'Всі предмети'});
      });
  }

  searchResults(event: {subjectKey: string, group: string, fromDate: string, toDate: string}): void {
    this.dataSource.getHistory(event.subjectKey, event.group, event.fromDate, event.toDate)
      .subscribe((value: Array<{dateStart: string, dateEnd: string, subjectName: string, themeName: string, time: string}>) => {
        if (value.length === 0) {
          this.snackBar.open('За таким запитом нічого не знайдено', 'Close', { duration: 3000 });
        }
        this.foundedLessonsInHistory = value.map(it => ({
            dateStart: ResultsComponent.parseDate(it.dateStart),
            dateEnd: ResultsComponent.parseDate(it.dateEnd),
            subject: { key: '-1', name: it.subjectName },
            topic: { key: '-1', name: it.themeName },
            time: Number(it.time)
        }));
      });
  }

}
