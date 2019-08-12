import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Constants} from '../constant/Constants';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth`, { username, password });
  }

  public updateToken(authCredentials: AuthResponse) {
    localStorage.setItem(Constants.localStorageToken, authCredentials.token);
  }
}
