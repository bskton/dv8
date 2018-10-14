import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class FirebaseAuthService implements AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

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
        console.log(error);
      });
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/signup']);
  }

  getUser(): User {
    return { ...this.user };
  }

  getAuthChange(): Subject<boolean> {
    return this.authChange;
  }
}
