import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LessonInHistory} from '../../../shared/models/lesson_in_history';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnChanges {

  @Input() foundedLessonsInHistory: Array<LessonInHistory> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageLessonsInHistory: Array<LessonInHistory> = [];
  constructor() { }

  ngOnInit() {
    this.paginator.hidePageSize = true;
  }

  reduceDate(result: number, value: LessonInHistory): number {
    if (value.dateEnd.getTime() && value.dateStart.getTime()) {
      return result + Math.floor((value.dateEnd.getTime() - value.dateStart.getTime()) / 1000);
    } else {
      return result + value.time;
    }
  }

  timeFormat(second: number) {
    return Math.floor(second / 60) + ':' + ((second % 60) >= 10 ? (second % 60) : ('0' + (second % 60)));
  }

  updateLessonInHistory(event) {
    this.pageLessonsInHistory = this.foundedLessonsInHistory.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paginator.firstPage();
    this.paginator.page.emit({
      pageIndex: 0,
      length: this.foundedLessonsInHistory.length,
      pageSize: this.paginator.pageSize,
      previousPageIndex: -1
    });
  }
}

