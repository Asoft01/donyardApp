import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BrowserHelper } from 'src/app/services/helpers/browser.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  message: any = null;

  processing: boolean = false;

  error: any = null;
  token: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private browserHelper: BrowserHelper) {
    this.signInForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(4)])]
    })
  }

  ngOnInit(): void {

  }

  get f() { return this.signInForm.controls; }

  getButtonIcon(): any {
    return (this.processing) ? faSpinner : faChevronRight;
  }

  onSubmit(): void {
    if (this.processing) {
      return;
    }

    if (this.signInForm.invalid) {
      return;
    }

    const username = this.signInForm.controls['userName'].value;
    const password = this.signInForm.controls['password'].value;

    this.processing = true;
    this.error = null;

    this.authService.login(username).subscribe((response: any) => {
      this.processing = false;
      
      if (response && response.status == "ok" && response.token != '') {

        this.error = null;
        this.token = response.token;

        this.authService.login2(password, this.token).subscribe((response: any) => {
          this.processing = false;
          if (response && response.status == "ok") {
            console.log("response P:  ", response);
            this.error = null;
            this.authService.initiateSession(response);
            return;
          }
          this.error = response && response.message;
        }, (error: any) => {
          this.processing = false;
          this.error = error && error.message;
        });

        //this.browserHelper.gotoDashboard();
        return;
      }
      this.error = response && response.message;

    }, (error: any) => {
      this.processing = false;
      this.error = error && error.message;
    });
  }

}
