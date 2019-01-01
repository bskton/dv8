import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class FirebaseAuthService implements AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) {}

  private createUser(authData: AuthData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    );
  }

  registerUser(authData: AuthData): void {
    this.createUser(authData)
      .then(result => {
        this.authChange.next(true);
        this.router.navigate(['/profile']);
      })
      .catch(error => {
        this.snackbar.open(error.message, null);
      });
  }

  login(authData: AuthData): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authChange.next(true);
        this.router.navigate(['/profile']);
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

  getUser(): User {
    return { ...this.user };
  }

  getAuthChange(): Subject<boolean> {
    return this.authChange;
  }
}
