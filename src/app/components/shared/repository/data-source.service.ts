import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Subject} from '../models/subject';
import {Topic} from '../models/topic';
import {Lesson} from '../models/lesson';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) {
  }

  getAllSubject(): Observable<Array<{k: string; name: string}>> {
    return this.http.get<Array<{k: string; name: string}>>(
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

  cancelLesson(lesson: Lesson): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('lesson_id', lesson.id);
    return this.http.post(`${environment.BASE_URL}/cancel_lesson.php`, formData);
  }

  endLesson(lesson: Lesson): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('lesson_id', lesson.id);
    return this.http.post(`${environment.BASE_URL}/success_lesson.php`, formData);
  }

  getHistory(subjectKey: string, group: string, fromDate: string, toDate: string): Observable<Object> {
    const params: HttpParams = new HttpParams();
    params.append('subject', subjectKey);
    params.append('group', group);
    params.append('from_date', fromDate);
    params.append('to_date', toDate);
    return this.http.get(`${environment.BASE_URL}/get_history.php`, {
      params: {
        subject: subjectKey,
        group: group,
        from_date: fromDate,
        to_date: toDate
      }});
  }

  getSubjectThatNotLearnYesterday(): Observable<Array<{subjectName: string}>> {
    return this.http.get<Array<{subjectName: string}>>(`${environment.BASE_URL}/get_subject_that_not_learn_yesterday.php`);
  }

  getStatistics(): Observable<Array<{formatted_time: string, seconds: number, subject_name: string}>> {
    return this.http.get<Array<{formatted_time: string, seconds: number, subject_name: string}>>(
      `${environment.BASE_URL}/get_statistics.php`
    );
  }

  deleteTopic(topic: Topic): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('topic_id', topic.key);
    return this.http.post(`${environment.BASE_URL}/delete_topic.php`, formData);
  }

  getEfficiency(): Observable<{efficiency: number}> {
    return this.http.get<{efficiency: number}>(`${environment.BASE_URL}/get_efficiency.php`);
  }

  login(login: string, password: string): Observable<{auth_token: string, auth_k: string}> {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    return this.http.post<{auth_token: string, auth_k: string}>(`${environment.BASE_URL}/get_user_token.php`, formData);
  }

  createSubject(subject: Subject): Observable<{k: string, name: string}> {
    const formData: FormData = new FormData();
    formData.append('subject_name', subject.name);
    return this.http.post<{k: string, name: string}>(
      `${environment.BASE_URL}/create_subject.php`,
      formData
    );
  }

  deleteSubject(subject: Subject): Observable<{message: string}> {
    const formData: FormData = new FormData();
    formData.append('subject_k', subject.key);
    return this.http.post<{message: string}>(`${environment.BASE_URL}/delete_subject.php`, formData);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(
      `${environment.BASE_URL}/get_user_info.php`
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<{message: string}> {
    const formData: FormData = new FormData();
    formData.append('old_password', oldPassword);
    formData.append('new_password', newPassword);
    return this.http.post<{message: string}>(
      `${environment.BASE_URL}/change_password.php`,
      formData
    );
  }
}
