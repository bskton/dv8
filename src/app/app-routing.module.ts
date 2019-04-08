import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { PasswordRestoreComponent } from './password-restore/password-restore.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UnauthGuard } from './auth/unauth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-password', component: NewPasswordComponent, canActivate: [UnauthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [UnauthGuard] },
  { path: 'password-restore', component: PasswordRestoreComponent, canActivate: [UnauthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
