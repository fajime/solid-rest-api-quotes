import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {

    const { API_URL, fields, CLIENT_ID, CLIENT_PASSWORD, username, password } = environment;

    const headersToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_PASSWORD}`)
      })
    };

    let params: HttpParams = new HttpParams();
    params = params.set('grant_type', 'password');
    params = params.set('username', username);
    params = params.set('password', password);

    return this.http.post(`${API_URL}/oauth/token`, params, headersToken ).pipe(
      switchMap( response => {
        const headersData = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + response['access_token']
          })
        };
        return this.http.get(`${API_URL}/quotes/2970161-1058-814?fields=${fields}`, headersData);
      })
    );
  }
}
