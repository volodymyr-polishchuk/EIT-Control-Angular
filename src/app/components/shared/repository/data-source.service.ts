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
      `${environment.OLD_BASE_URL}/all_subject.php`
    );
  }

  getTopicsForSubject(key: string): Observable<Object> {
    const params = new HttpParams().set('subject_code', key);
    return this.http.get(
      `${environment.OLD_BASE_URL}/all_themes.php`,
      { params: params }
    );
  }

  startLesson(subject: Subject, topic: Topic): Observable<Object> {
    return this.http.post(
      `${environment.OLD_BASE_URL}/start_lesson.php`,
      {
        subject: subject.key,
        theme: topic.name,
      }
      );
  }

  getActiveLessons(): Observable<Object> {
    return this.http.get(
      `${environment.OLD_BASE_URL}/all_lessons.php`,
    );
  }

  cancelLesson(lesson: Lesson): Observable<Object> {
    return this.http.post(`${environment.OLD_BASE_URL}/cancel_lesson.php`, {
      lesson_id: lesson.id,
    });
  }

  endLesson(lesson: Lesson): Observable<Object> {
    return this.http.post(`${environment.OLD_BASE_URL}/success_lesson.php`, {
      lesson_id: lesson.id,
    });
  }

  getHistory(subjectKey: string, group: string, fromDate: string, toDate: string): Observable<Object> {
    const params: HttpParams = new HttpParams();
    params.append('subject', subjectKey);
    params.append('group', group);
    params.append('from_date', fromDate);
    params.append('to_date', toDate);
    return this.http.get(`${environment.OLD_BASE_URL}/get_history.php`, {
      params: {
        subject: subjectKey,
        group: group,
        from_date: fromDate,
        to_date: toDate
      }});
  }

  getSubjectThatNotLearnYesterday(): Observable<Array<{subjectName: string}>> {
    return this.http.get<Array<{subjectName: string}>>(`${environment.OLD_BASE_URL}/get_subject_that_not_learn_yesterday.php`);
  }

  getStatistics(): Observable<Array<{formatted_time: string, seconds: number, subject_name: string}>> {
    return this.http.get<Array<{formatted_time: string, seconds: number, subject_name: string}>>(
      `${environment.OLD_BASE_URL}/get_statistics.php`
    );
  }

  deleteTopic(topic: Topic): Observable<Object> {
    return this.http.post(`${environment.OLD_BASE_URL}/delete_topic.php`, {
      topic_id: topic.key,
    });
  }

  getEfficiency(): Observable<{efficiency: number}> {
    return this.http.get<{efficiency: number}>(`${environment.OLD_BASE_URL}/get_efficiency.php`);
  }

  login(login: string, password: string): Observable<{auth_token: string, auth_k: string}> {
    return this.http.post<{auth_token: string, auth_k: string}>(`${environment.OLD_BASE_URL}/get_user_token.php`, {
      login, password,
    });
  }

  createSubject(subject: Subject): Observable<{k: string, name: string}> {
    return this.http.post<{k: string, name: string}>(
      `${environment.OLD_BASE_URL}/create_subject.php`,
      {
        subject_name: subject.name,
      }
    );
  }

  deleteSubject(subject: Subject): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${environment.OLD_BASE_URL}/delete_subject.php`, {
      subject_k: subject.key,
    });
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(
      `${environment.OLD_BASE_URL}/get_user_info.php`
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(
      `${environment.OLD_BASE_URL}/change_password.php`,
      {
        old_password: oldPassword,
        new_password: newPassword,
      }
    );
  }

  getStatisticsForDays(): Observable<Array<{day_result: number, date: Date}>> {
    return this.http.get<Array<{day_result: number, date: Date}>>(
      `${environment.OLD_BASE_URL}/get_statistics_for_days.php`
    );
  }

  signUp(name: string, email: string, login: string, password: string): Observable<{auth_token: string, auth_k: string}> {
    return this.http.post<{auth_token: string, auth_k: string}>(`${environment.OLD_BASE_URL}/sign_up.php`, {
      name, email, login, password,
    });
  }
}
