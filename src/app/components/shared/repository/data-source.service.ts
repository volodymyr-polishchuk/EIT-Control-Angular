import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {Subject} from '../models/subject';
import {Topic} from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) {
  }

  login(): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('login', 'volodymyr');
    formData.append('password', 'admin');
    return this.http.post(`http://eit.hwork.net/login.php`, formData);
  }

  getAllSubject(): Observable<Object> {
    return this.http.get(
      `${environment.BASE_URL}/all_subject.php`
    );
  }

  getTopicsForSubject(key: string): Observable<Object> {
    const params = new HttpParams().set('subject_code', key);
    return this.http.get(
      `${environment.BASE_URL}/all_themes.php`,
      { params: params }
    );
  }

  startLesson(subject: Subject, topic: Topic): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('subject', subject.key);
    formData.append('theme', topic.name);
    return this.http.post(
      `${environment.BASE_URL}/start_lesson.php`,
      formData
      );
  }

  getActiveLessons(): Observable<Object> {
    return this.http.get(
      `${environment.BASE_URL}/all_lessons.php`,
    );
  }
}
