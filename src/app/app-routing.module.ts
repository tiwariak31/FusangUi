import { NgModule } from '@angular/core';
import { RouterModule, Routes, RoutesRecognized } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CommonComponent } from './common/common.component';
import { HomeComponent } from './home/home.component';
import { InviteUsersComponent } from './invite-users/invite-users.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { GoogleAuthComponent } from './authentication/google-auth/google-auth.component';
import { YubikeyComponent } from './authentication/yubikey/yubikey.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SettingComponent } from './home/setting/setting.component';
import { SuggestionsComponent } from './home/suggestions/suggestions.component';
import { UsersComponent } from './home/users/users.component';
import { SignInComponent } from './onboarding/sign-in/sign-in.component';
import { SignUpComponent } from './onboarding/sign-up/sign-up.component';
import { OnboardingTextComponent } from './onboarding/onboarding-text/onboarding-text.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PersonalWalletComponent} from './home/userdashboard/personal-wallet/personal-wallet.component';
import {WalletCreateComponent} from './home/userdashboard/wallet-create/wallet-create.component';
import { WalletCreatInfoComponent } from './home/userdashboard/wallet-creat-info/wallet-creat-info.component';
import { UserProfileComponent } from './home/userdashboard/user-profile/user-profile.component';
import { ForgetPasswordComponent } from './onboarding/forget-password/forget-password.component';
import { ResetPasswordComponent } from './onboarding/reset-password/reset-password.component';
import { InviteCustomersComponent } from './home/users/invite-customers/invite-customers.component';
const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'yubikey-authentication', component: YubikeyComponent},
  { path: 'google-authentication', component: GoogleAuthComponent},
  { path: 'forget-password', component: ForgetPasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  { path: 'onboarding-authentication', component: OnboardingComponent},
  { path: 'termcondition', component: TermsConditionComponent },
  {path: 'invite-customers', component:InviteCustomersComponent},
      // { path: 'walletcreate-info', component: WalletCreatInfoComponent},
  {
    path: 'fusang',
    component: HomeComponent,
    children : [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
       // { path: 'forbidden', component: ErrorComponent},
  { path: 'walletcreate', component: WalletCreateComponent,
},
    { path: '', redirectTo: 'walletcreate', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'createvalletinfo',
        component: WalletCreatInfoComponent
      },
      {
        path: 'personalwallet',
        component: PersonalWalletComponent
      },
      {
        path: 'userList',
        component: UsersComponent
      },
      {
        path: 'userProfile',
        component: UserProfileComponent
      },
         ]
  },
];
@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ]
})
export class AppRoutingModule { }
export const routingComponents = [SignUpComponent, YubikeyComponent, GoogleAuthComponent, OnboardingComponent];
