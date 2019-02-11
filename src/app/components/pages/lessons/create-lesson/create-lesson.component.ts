import { Component, OnInit } from '@angular/core';
import {Subject} from '../../../shared/models/subject';
import {DataSourceService} from '../../../shared/repository/data-source.service';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  subjects: Array<Subject> = [];
  constructor(private dataSource: DataSourceService) { }

  ngOnInit() {
    this.dataSource.getAllSubject().subscribe(
      (next: Array<{k: string; name: string}>) => {
        this.subjects = next.map((item) => ({key: item.k, name: item.name}));
      }, error => {
        // alert(JSON.stringify(error));
        console.log(error);
      }, () => {
        alert('complete');
      });
  }

}
