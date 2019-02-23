import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from '../../../shared/models/subject';
import {DataSourceService} from '../../../shared/repository/data-source.service';
import {Topic} from '../../../shared/models/topic';
import {MatSnackBar} from '@angular/material';
import {Lesson} from '../../../shared/models/lesson';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  topicControl = new FormControl();
  subjects: Array<Subject> = [];
  topics: Array<Topic> = [];
  filteredTopics: Observable<Array<Topic>>;
  lessons: Array<Lesson> = [];
  lastSubjectKey: string;
  @Output() onCreateLesson: EventEmitter<Lesson> = new EventEmitter<Lesson>();
  constructor(private dataSource: DataSourceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subjects = JSON.parse(localStorage.getItem('subjects'));
    this.dataSource.getAllSubject().subscribe(
      (next: Array<{k: string; name: string}>) => {
        this.subjects = next.map((item) => ({key: item.k, name: item.name}));
        localStorage.setItem('subjects', JSON.stringify(this.subjects));
        if (this.subjects) {
          this.refreshTopicsList(this.subjects[0].key);
        }
      });
  }

  updateTopicsList(event: any): void {
    this.refreshTopicsList(event.target[event.target.selectedIndex].value);
  }

  startLesson(subjectSelect: any, topicInput: HTMLInputElement): void {
    if (!topicInput.value) {
      this.snackBar.open('Тема заняття не може бути пустою', 'Закрити', { duration: 2000 });
      return;
    }
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
    if (key === '-1') {
      key = this.lastSubjectKey;
    }
    this.lastSubjectKey = key;
    this.dataSource.getTopicsForSubject(key)
      .subscribe((value: Array<{k: string, name: string}>) => {
        this.topics = value.map((it) => ({key: it.k, name: it.name}));
        this.filteredTopics = this.topicControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterTopic(value))
          );
        (document.getElementById('topicInput') as HTMLInputElement).value = '';
      });
  }

  private _filterTopic(value: string): Array<Topic> {
    const topicName = value.toLowerCase();
    return this.topics.filter(option => option.name.toLowerCase().includes(topicName));
  }

  removeTopic(topic: Topic): void {
    if (confirm(`Ви точно бажаєте видалити тему [${topic.name}]`)) {
      this.dataSource.deleteTopic(topic)
        .subscribe(value => {
          this.refreshTopicsList('-1');
          this.snackBar.open('Тема успішно видалена', 'Закрити', { duration: 2000 });
        }, (error) => {
          this.snackBar.open(error.error.message, 'Закрити', { duration: 2000 });
        });
    }
  }
}
