import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BrowserHelper } from 'src/app/services/helpers/browser.helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  verifiedDetail: any;
  cachedId: any = this.localStorageService.getItem('cacheid');
  verificationCode: any;
  processing: boolean = false;
  error: any = null;

  constructor(private localStorageService: LocalStorageService, private authService: AuthService,
    private userRegService: UserRegistrationService, private browserHelper: BrowserHelper) { 
  }

  getButtonIcon(): any {
    return (this.processing) ? faSpinner : faChevronRight;
  }

  verifyCode(): void {
  
    if (this.processing) {
      return;
    }

    if (!this.verificationCode || this.verificationCode == null) {
      return;
    }

    this.processing = true;
    this.error = null;

    this.userRegService.verifyCode(this.verificationCode, this.cachedId).subscribe((response: any) => {
      this.processing = false;

      if (response && response.message == 'Verified') {
        console.log("response:  ", response);
        this.error = null;

        // need to remove the below values after successfull verification
        // this.localStorageService.removeItem('verifiedObject');
        // this.localStorageService.removeItem('cacheid');

        this.browserHelper.gotoPage('complete-registration');
        return;
      }

      this.error = response && response.message;

    }, (error: any) => {
      this.processing = false;
      this.error = error && error.message;
    });
  }

  ngOnInit(): void {
    this.cachedId = this.localStorageService.getItem('cacheid');
    this.verifiedDetail = this.localStorageService.getItem('verifiedObject');
  }


}
