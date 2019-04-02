import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { AuthService } from './auth.service';
import { User } from './user.model';
import * as fromApp from '../app.reducer';
import * as UI from '../ui.actions';

@Injectable()
export class FirebaseAuthService implements AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private store: Store<{ui: fromApp.State}>,
  ) {
    this.getUserObservable().subscribe(user => {
      if (user) {
        this.authChange.next(true);
      } else {
        this.authChange.next(false);
      }
    });
  }

  confirmPasswordReset(code: string, password: string): void {
    this.afAuth.auth.confirmPasswordReset(code, password)
      .then(resp => console.log(resp)) // TODO: Remove
      .catch(error => console.log(error)); // TODO: Remove
  }

  getUser(): User {
    return {...this.user};
  }

  getAuthChange(): Subject<boolean> {
    return this.authChange;
  }

  getUserObservable(): Observable<any> {
    return this.afAuth.user;
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.authSuccessfully();
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.snackbar.open(error.message, null);
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/signin']);
  }

  registerUser(authData: AuthData): void {
    this.createUser(authData)
      .then(() => {
        this.authSuccessfully();
      })
      .catch(error => {
        this.snackbar.open(error.message, null);
      });
  }

  sendResetEmail(email: string): void {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log('Sent password reset email', email)) // TODO: Remove
      .catch(error => console.log(error)); // TODO: Remove
  }

  verifyPasswordResetCode(code: string): void {
    this.afAuth.auth.verifyPasswordResetCode(code)
      .then(email => console.log(email)) // TODO: Remove
      .catch(error => console.log(error)); // TODO: Remove
  }

  private createUser(authData: AuthData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    );
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.user = {
      email: '',
      userId: ''
    };
    this.router.navigate(['/profile']);
  }
}
