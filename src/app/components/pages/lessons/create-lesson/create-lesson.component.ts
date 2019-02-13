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
    this.dataSource.getAllSubject().subscribe(
      (next: Array<{k: string; name: string}>) => {
        this.subjects = next.map((item) => ({key: item.k, name: item.name}));
        if (this.subjects) {
          this.refreshTopicsList(this.subjects[0].key);
        }
      });
  }

  updateTopicsList(event: any): void {
    this.refreshTopicsList(event.target[event.target.selectedIndex].value);
  }

  startLesson(subjectSelect: any, topicInput: HTMLInputElement): void {
    let topic: Topic = this.topics.find(t => t.name === topicInput.value);
    if (!topic) {
      topic = {key: '-1', name: topicInput.value};
    }
    const subject: Subject = this.subjects.find(value => value.key === subjectSelect[subjectSelect.selectedIndex].value);
    this.onCreateLesson.emit({
      id: '-1',
      name: subject.name,
      topic: topic,
      timeToNowDifference: new Date().getTime(),
      subject: subject
    });
    this.snackBar.open('Заняття розпочалося', 'Закрити', { duration: 1000 });
  }

  refreshTopicsList(key: string): void {
    this.dataSource.getTopicsForSubject(key)
      .subscribe((value: Array<{k: string, name: string}>) => {
        this.topics = value.map((it) => ({key: it.k, name: it.name}));
      });
  }
}
