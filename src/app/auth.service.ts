import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {

    const headersToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('webfg-test:WW58YJj89ltR43Cr')
      })
    };

    let params: HttpParams = new HttpParams();
    params = params.set('grant_type', 'password');
    params = params.set('username', 'test001');
    params = params.set('password', 'ryby3NTyKduAMcvZ');

    return this.http.post<any>('https://integra1.solutions.webfg.ch/restweb/oauth/token', params, headersToken ).pipe(
      switchMap( response => {
        const headersData = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + response['access_token']
          })
        };
        return this.http.get<any>('https://integra1.solutions.webfg.ch/restweb/quotes/2970161-1058-814?fields= LVAL_NORM,CLOSE_ADJ_NORM,NC2_PR_NORM,NC2_NORM,VOL,TUR,PY_CLOSE,YTD_PR_NORM', headersData);
      })
    );
  }
}
