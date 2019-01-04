import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class FirebaseAuthService implements AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) {
    this.getUserObservable().subscribe(user => {
      if (user) {
        this.authChange.next(true);
      } else {
        this.authChange.next(false);
      }
    });
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
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.authSuccessfully();
      })
      .catch(error => {
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
