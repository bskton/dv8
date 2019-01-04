import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService implements AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) {

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

  init(): void {
    this.afAuth.user.subscribe(user => {
      console.log(user); // TODO
      if (user) {
        this.authChange.next(true);
      } else {
        this.authChange.next(false);
      }
    });
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.user.pipe(switchMap(user => {
      if (user) {
        this.authChange.next(true);
        return of(true);
      } else {
        this.authChange.next(false);
        return of(false);
      }
    }));
  }

  login(authData: AuthData): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
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
      .then(result => {
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
