import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BrowserHelper } from '../services/helpers/browser.helper';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private browserHelper: BrowserHelper) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedIn()) {
      return true
    }
    else{
      return false;
    }
  }

  public isLoggedIn(): boolean {
    if(this.localStorageService.getItem('isLoggedIn') == "true") {
      return true;
    }
    else {
      this.browserHelper.gotoLogin();
      return false;
    }
  }
  
}
