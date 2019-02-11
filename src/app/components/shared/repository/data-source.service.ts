import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) {
    this.http.post(`${environment.BASE_URL}/api/login.php`, {login: 'volodymyr', password: 'admin'})
      .subscribe(() => {}, error => console.log(error));
  }

  getAllSubject(): Observable<Object> {
    return this.http.get(
      `${environment.BASE_URL}/api/all_subject.php`
    );
  }
}
