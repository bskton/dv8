import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { AuthService } from './auth.service';
import { User } from './user.model';
import * as Auth from './auth.actions';
import * as UI from '../ui.actions';
import * as fromApp from '../app.reducer';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService implements AuthService {
  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private store: Store<fromApp.State>,
  ) {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
      }
    });
  }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        take(1),
        map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate['/signin'];
          }
        })
      );
  }

  confirmPasswordReset(code: string, password: string): void {
    this.afAuth.auth.confirmPasswordReset(code, password)
      .then(resp => console.log(resp)) // TODO: Remove
      .catch(error => console.log(error)); // TODO: Remove
  }

  getUser(): User {
    return {...this.user};
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(fromApp.getIsAuthenticated);
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
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store.dispatch(new UI.StopLoading());
        this.snackbar.open(error.message, null);
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.user = null;
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
    this.store.dispatch(new Auth.SetAuthenticated());
    this.user = {
      email: '',
      userId: ''
    };
    this.router.navigate(['/profile']);
  }
}
