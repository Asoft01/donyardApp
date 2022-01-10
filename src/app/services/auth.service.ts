import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { StorageKeys } from 'src/app/models/storage-key-constants'
import * as shajs from 'sha.js';
import { BrowserHelper } from './helpers/browser.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //hash: any;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private browserHelper: BrowserHelper) { }

  login(username: string): Observable<any> {
    // this.hash = shajs('sha256').update('devyardteam@donyard').digest('hex');
    const url: string = environment.apiBaseUrl + '/login/username';

    const request = {
      username
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: StorageKeys.AUTHORIZATION_HEADER
      })
    };

    return this.http.post<any>(url, request, httpOptions).pipe(catchError(this.handleGetTokenError));
  }

  login2(password: string, token: string): Observable<any> {
    const url: string = environment.apiBaseUrl + '/login/password';

    const request = {
      token: token,
      security: password
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: StorageKeys.AUTHORIZATION_HEADER
      })
    };

    return this.http.post<any>(url, request, httpOptions).pipe(catchError(this.handleGetTokenError));
  }

  logOut(): void {
    this.localStorageService.flush();
    this.browserHelper.redirectToLogin();
  }

  initiateSession(loginObject: any): void {
    if (!loginObject) {
        return;
    }

    this.localStorageService.flush();

    const accessToken = loginObject.token;
    const userid = loginObject.userid

    this.localStorageService.setItem('token', accessToken);
    this.localStorageService.setItem('userid', userid);
    this.localStorageService.setItem('isLoggedIn', 'true');

    this.browserHelper.gotoDashboard();
}

  private handleGetTokenError(error: HttpErrorResponse): any {
    let errorMessage = 'Could not complete your request. Please try again!';
    if (error == null) {
      return of({ message: errorMessage });
    }

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Error occurred! Could not connect to server. Please try again.';
      return of({ message: errorMessage });
    }

    if (error.status === 0) {
      errorMessage = 'Could not connect to server. Please check your connection and try again.';
      return of({ message: errorMessage });
    }

    if(error.error.message) {
      errorMessage = 'Error: '+ error.error.message;
      return of({ message: errorMessage });
    }

    errorMessage = 'Could not confirm your login details. Please try again.';
    return of({ message: errorMessage });
  }

}
