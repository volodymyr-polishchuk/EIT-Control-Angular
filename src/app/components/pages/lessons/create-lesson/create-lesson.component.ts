import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from '../../../shared/models/subject';
import {DataSourceService} from '../../../shared/repository/data-source.service';
import {InMemoryDataSourceService} from '../../../shared/repository/in-memory-data-source.service';
import {Topic} from '../../../shared/models/topic';
import {MatSnackBar} from '@angular/material';
import {Lesson} from '../../../shared/models/lesson';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  subjects: Array<Subject> = [];
  topics: Array<Topic> = [];
  lessons: Array<Lesson> = [];
  @Output() onCreateLesson: EventEmitter<Lesson> = new EventEmitter<Lesson>();
  constructor(private dataSource: DataSourceService,
              private ds: InMemoryDataSourceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.dataSource.getAllSubject().subscribe(
    //   (next: Array<{k: string; name: string}>) => {
    //     this.subjects = next.map((item) => ({key: item.k, name: item.name}));
    //   }, error => {
    //     // alert(JSON.stringify(error));
    //     console.log(error);
    //   }, () => {
    //     alert('complete');
    //   });
    this.subjects = this.ds.getAllSubject();
    this.topics = this.ds.getTopicForSubject(this.subjects[0].key);
  }

  updateTopicsList(event: any): void {
    this.topics = this.ds.getTopicForSubject(event.target[event.target.selectedIndex].value);
  }
  startLesson(subjectSelect: any, topicInput: HTMLInputElement): void {
    let topic: Topic = this.topics.find(t => t.name === topicInput.value);
    if (!topic) {
      topic = {key: '0', name: topicInput.value};
    }
    this.onCreateLesson.emit({
      id: '',
      name: this.subjects.find(value => value.key === subjectSelect[subjectSelect.selectedIndex].value).name,
      topic: topic,
      timeToNowDifference: new Date().getTime()
    });
    this.snackBar.open('Заняття розпочалося', 'Закрити', { duration: 1000 });
  }
}
