import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['/profile']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/signup']);
  }

  getUser(): User {
    return { ...this.user };
  }
}