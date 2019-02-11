import { Injectable } from '@angular/core';
import {Subject} from '../models/subject';
import {Topic} from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataSourceService {

  private subjects: Array<Subject> = [
    { key: '1', name: 'Англійська мова' },
    { key: '2', name: 'Географія' },
    { key: '3', name: 'Історія' },
    { key: '4', name: 'Українська мова' }
  ];
  private topics: Array<Topic> = [
    { key: '1', name: 'Основи' },
    { key: '1', name: 'Основи' },
    { key: '1', name: 'Основи' },
    { key: '1', name: 'Основи' },
    { key: '2', name: 'Поглиблене вивчення' },
    { key: '2', name: 'Поглиблене вивчення' },
    { key: '2', name: 'Поглиблене вивчення' },
    { key: '3', name: 'Обширно' },
    { key: '3', name: 'Обширно' },
    { key: '4', name: 'Ще більш обширно' },
  ];
  constructor() { }

  getAllSubject(): Array<Subject> {
    return this.subjects;
  }
  getTopicForSubject(key: string): Array<Topic> {
    return this.topics.filter(item => item.key === key);
  }
}
