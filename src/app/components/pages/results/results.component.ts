import { Component, OnInit } from '@angular/core';
import {DataSourceService} from '../../shared/repository/data-source.service';
import {LessonInHistory} from '../../shared/models/lesson_in_history';
import {Subject} from '../../shared/models/subject';
import {Topic} from '../../shared/models/topic';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  subjects: Array<Subject> = [];
  foundedLessonsInHistory: Array<LessonInHistory> = [];
  constructor(private dataSource: DataSourceService) { }

  ngOnInit() {
    this.dataSource.getAllSubject().subscribe(
      (next: Array<{k: string; name: string}>) => {
        this.subjects = next.map((item) => ({key: item.k, name: item.name}));
      });
  }

  searchResults(event: {subjectKey: string, group: string, fromDate: string, toDate: string}): void {
    this.dataSource.getHistory(event.subjectKey, event.group, event.fromDate, event.toDate)
      .subscribe((value: Array<{
        dateEnd: string,
        dateStart: string,
        subjectName: string,
        themeName: string,
        time: string}>) => {
        this.foundedLessonsInHistory = value.map(it => ({
          dateStart: new Date(it.dateStart),
          dateEnd: new Date(it.dateEnd),
          subject: { key: '-1', name: it.subjectName },
          topic: { key: '-1', name: it.themeName },
          time: Number(it.time)
        }));
      });
  }

}
