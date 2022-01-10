import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from 'src/app/models/storage-key-constants'
import { LocalStorageService } from './local-storage.service';
import { ApiHelperService } from './helpers/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private apiHeler: ApiHelperService) { }

  private handleError(error: HttpErrorResponse): any {
    console.log("error to be handled: ",error);
    return of({ message: ApiHelperService.getErrorMessage(error) });
  } 

  verifyEmailOrMobile(emailOrMobile: string): Observable<any> {
    const url: string = environment.apiBaseUrl + '/register/verifyemail';

    const request = {
      email: emailOrMobile
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: StorageKeys.AUTHORIZATION_HEADER
      })
    };

    return this.http.post<any>(url, request, httpOptions).pipe(catchError(this.handleGetTokenError));
  }

  userDetail: any = this.localStorageService.getItem('verifiedObject');

  verifyCode(code: string, cacheId: any): Observable<any> {
    const url: string = environment.apiBaseUrl + '/register/verifymobile/'+cacheId + '/'+ code + '/' + this.userDetail +'/email';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: StorageKeys.AUTHORIZATION_HEADER
      })
    };

    return this.http.get<any>(url, httpOptions).pipe(catchError(this.handleGetTokenError));
  }

  register(credential: any): Observable<any> {
    const url: string = environment.apiBaseUrl + '/register';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: StorageKeys.AUTHORIZATION_HEADER
      })
    };

    return this.http.post<any>(url, credential, httpOptions).pipe(catchError(this.handleError));
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

    errorMessage = 'Could not confirm your verification details. Please try again.';
    return of({ message: errorMessage });
  }

}
