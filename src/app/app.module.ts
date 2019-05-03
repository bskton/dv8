import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { PasswordRestoreComponent } from './password-restore/password-restore.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { StoryNgrxService } from './stories/story-ngrx.service';
import { reducers } from './app.reducer';
import { environment } from '../environments/environment';
import { ProfileFirestoreService } from './profile/profile-firestore.service';
import { NewsService } from './news.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewPasswordComponent,
    PasswordRestoreComponent,
    ProfileComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    {
      provide: 'AuthService',
      useClass: environment.authServiceType
    },
    {
      provide: 'ProfileService',
      useClass: ProfileFirestoreService
    },
    {
      provide: 'StoryService',
      useClass: StoryNgrxService
    },
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
