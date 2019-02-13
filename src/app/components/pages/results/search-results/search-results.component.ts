import {Component, Input, OnInit} from '@angular/core';
import {LessonInHistory} from '../../../shared/models/lesson_in_history';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() foundedLessonsInHistory: Array<LessonInHistory> = [];
  constructor() { }

  ngOnInit() {
  }

}
