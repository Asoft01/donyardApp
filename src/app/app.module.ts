import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonyardInputComponent } from './components/donyard-input/donyard-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalStorageService } from './services/local-storage.service';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserHelper } from './services/helpers/browser.helper';
import { SignupComponent } from './pages/signup/signup.component';
import { DonyardLandingInfoPanelComponent } from './components/donyard-landing-info-panel/donyard-landing-info-panel.component';
import { VerifyCodeComponent } from './pages/signup/verify-code/verify-code.component';
import { CompleteRegistrationComponent } from './pages/signup/complete-registration/complete-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DonyardInputComponent,
    DashboardComponent,
    SignupComponent,
    DonyardLandingInfoPanelComponent,
    VerifyCodeComponent,
    CompleteRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    LocalStorageService,
    AuthGuard,
    BrowserHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
