import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class BrowserHelper {

    private static BASE_URL = '';

    constructor(public router: Router) {
    }


    static redirectToLandingPage(): void {
        location.href = BrowserHelper.BASE_URL;
    }

    static redirectToPage(page: string): void {
        window.location.href = this.BASE_URL + '/' + page;
    }

    gotoPage(page: string = ''): void {
        this.router.navigateByUrl(page);
    }

    gotoDashboard(): void {
        this.router.navigateByUrl('dashboard');
    }

    gotoProfileSetup(): void {
        this.router.navigateByUrl('signup/profile');
    }

    gotoLogin(): void {
        this.router.navigateByUrl('/');
    }

    redirectToLogin(): void {
        BrowserHelper.redirectToPage('login');
    }
}
