import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BrowserHelper } from 'src/app/services/helpers/browser.helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  message: any = null;

  processing: boolean = false;

  error: any = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userRegService: UserRegistrationService, private browserHelper: BrowserHelper, private localStorageService: LocalStorageService) {
    this.signUpForm = this.formBuilder.group({
      emailMobile: [null, Validators.required]
    })
  }

  ngOnInit(): void {

  }

  get f() { return this.signUpForm.controls; }

  getButtonIcon(): any {
    return (this.processing) ? faSpinner : faChevronRight;
  }

  onSubmit(): void {
    if (this.processing) {
      return;
    }

    if (this.signUpForm.invalid) {
      return;
    }

    const emailOrMobile = this.signUpForm.controls['emailMobile'].value;

    this.processing = true;
    this.error = null;

    this.userRegService.verifyEmailOrMobile(emailOrMobile).subscribe((response: any) => {
      this.processing = false;

      this.localStorageService.removeItem('verifiedObject');
      this.localStorageService.removeItem('cacheid');

      if (response && response.message && response.status == "ok") {
        console.log("response:  ", response);
        this.error = null;
        
        this.localStorageService.setItem('verifiedObject', emailOrMobile);
        this.localStorageService.setItem('cacheid', response.cacheid);
        
        this.browserHelper.gotoPage('verify-code');
        return;
      }

      this.error = response && response.message;

    }, (error: any) => {
      this.processing = false;
      this.error = error && error.message;
    });
  }

}
