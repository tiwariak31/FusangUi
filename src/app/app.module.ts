import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {MaterialModule} from './material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CommonComponent } from './common/common.component';
import { HomeComponent } from './home/home.component';
import { InviteUsersComponent } from './invite-users/invite-users.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { GoogleAuthComponent } from './authentication/google-auth/google-auth.component';
import { YubikeyComponent } from './authentication/yubikey/yubikey.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SettingComponent } from './home/setting/setting.component';
import { SuggestionsComponent } from './home/suggestions/suggestions.component';
import { UsersComponent } from './home/users/users.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignInComponent } from './onboarding/sign-in/sign-in.component';
import { SignUpComponent } from './onboarding/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './onboarding/forget-password/forget-password.component';
import { OnboardingTextComponent } from './onboarding/onboarding-text/onboarding-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GeneralService} from './general.service';
import { SharedService } from './shared.service';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { WalletCreateComponent } from './home/userdashboard/wallet-create/wallet-create.component';
import { PersonalWalletComponent } from './home/userdashboard/personal-wallet/personal-wallet.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { WalletCreatInfoComponent } from './home/userdashboard/wallet-creat-info/wallet-creat-info.component';
import { QRCodeModule } from 'angularx-qrcode';
import {DatePipe} from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { ShowLoadingComponent } from './common/show-loading/show-loading.component';
// import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { FilterlistPipe } from './filterlist.pipe';
import { InputexpDirective } from './inputexp.directive';
// import { ChartModule } from 'angular-highcharts';
import {NgAutoCompleteModule} from 'ng-auto-complete';
import { AutoCompleteModule } from 'ng4-auto-complete';
import {MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule} from '@angular/material';
// import {ShowLoadingComponent} from './'

import { ChartModule } from 'angular-highcharts';
import { UserProfileComponent } from './home/userdashboard/user-profile/user-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResetPasswordComponent } from './onboarding/reset-password/reset-password.component';
import { ToasterModalComponent } from './common/toaster-modal/toaster-modal.component';
import { ToasterErrorModalComponent } from './common/toaster-error-modal/toaster-error-modal.component';
import { ToasterInfoModalComponent } from './common/toaster-info-modal/toaster-info-modal.component';
import { InviteCustomersComponent } from './home/users/invite-customers/invite-customers.component';

declare var require: any;
// export function highchartsFactory() {
//   // return require('highcharts');
// }

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CommonComponent,
    HomeComponent,
    InviteUsersComponent,
    OnboardingComponent,
    TermsConditionComponent,
    GoogleAuthComponent,
    YubikeyComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    SettingComponent,
    SuggestionsComponent,
    UsersComponent,
    SignInComponent,
    SignUpComponent,
    OnboardingTextComponent,
    WalletCreateComponent,
    PersonalWalletComponent,
    WalletCreatInfoComponent,
    ShowLoadingComponent,
    FilterlistPipe,
    InputexpDirective,
    UserProfileComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ToasterModalComponent,
    ToasterErrorModalComponent,
    ToasterInfoModalComponent,
    InviteCustomersComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      closeButton: true,
      preventDuplicates: true,
      positionClass: 'toast-top-center'
    }),
    AngularFontAwesomeModule,
    NgxQRCodeModule,
    TabsModule.forRoot(),
    ChartModule,
    QRCodeModule,
    NgAutoCompleteModule,
    AutoCompleteModule,
    NgSelectModule,
    MaterialModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [GeneralService, SharedService, DatePipe, TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
