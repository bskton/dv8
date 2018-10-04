import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'signup', component: SignupComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}