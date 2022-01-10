import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {
  constructor() {
  }

  static getErrorMessage(error: HttpErrorResponse): string {
      let errorMessage = 'Could not complete your requestss. Please try again!';
      console.log("errorMessafe: ",error);
      if (error == null) {
          return errorMessage;
      }

      if (error.error instanceof ErrorEvent) {
          errorMessage = 'Error occurred! Could not connect to server. Please try again.';
          return errorMessage;
      }

      if (error.status === 0) {
          errorMessage = 'Could not connect to server. Please check your connection and try again.';
          return errorMessage;
      }

      if (error.error.error.security != null) {
        errorMessage = error.error.error.security;
        return errorMessage;
    }

      // handle error response body...

      return 'Could not complete your request. Please try again!';
  }
}
