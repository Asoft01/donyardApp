import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BrowserHelper } from 'src/app/services/helpers/browser.helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
const NaijaStates = require('naija-state-local-government');

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent implements OnInit {

  signUpForm: FormGroup;

  message: any = null;

  processing: boolean = false;

  error: any = null;

  successMessage: any = null;

  naijaStates: any = NaijaStates.states();

  stateName: string = '';

  cityNames: any;

  cityName: string = '';

  emailVerified: number = 0;

  

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userRegService: UserRegistrationService, private browserHelper: BrowserHelper, private localStorageService: LocalStorageService) {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{8,}$)(?=(?:.*?[A-Z]))(?=.*?[a-z])(?=(?:.*?[0-9])).*$')])],
      address: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required]
    })
  }

  //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')

  ngOnInit(): void {

  }

  get f() { return this.signUpForm.controls; }

  getButtonIcon(): any {
    return (this.processing) ? faSpinner : faChevronRight;
  }

  changeState(e: any) {
    this.stateName = this.signUpForm.controls['state'].value;
    this.cityNames = (NaijaStates.lgas(this.stateName)).lgas;
  }

  changeCity(e: any) {
    this.cityName = this.signUpForm.controls['lga'].value;
  }

  onSubmit(): void {
  
    if (this.processing) {
      return;
    }

    if (this.signUpForm.invalid) {
      return;
    }

    this.emailVerified = (this.localStorageService.getItem('verifiedObject') != null) ? 1 : 0; 
    const request = {
      city: this.cityName,
      email: this.localStorageService.getItem('verifiedObject'),
      email_verified: this.emailVerified,
      fullname: this.f['fullName'].value,
      mobile: "",
      mobile_verified: 0,
      profile_type: "1",
      security: this.f['password'].value,
      state_of_residence: this.f['state'].value,
      username: this.f['userName'].value,
    }

    this.processing = true;
    this.error = null;
    this.successMessage = null;

    console.log("request", request);

    this.userRegService.register(request).subscribe((response: any) => {
      this.processing = false;

      if (response && response.message && response.status == "ok") {
        console.log("response:  ", response);
        this.error = null;
        this.successMessage = response && response.message;
        console.log(response.message);
        setTimeout(()=>{
          this.browserHelper.gotoPage('dashboard');
        }, 3000);
        return;
      }
      console.log("response: ", response);
      this.error = response && response.message;

    }, (error: any) => {
      this.processing = false;
      this.error = error && error.message;
    });
  }

}
