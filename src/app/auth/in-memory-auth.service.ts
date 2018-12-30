import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class InMemoryAuthService implements AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData): void {
    this.authChange.next(true);
    this.router.navigate(['/profile']);
  }

  login(authData: AuthData): void {
    this.authChange.next(true);
    this.router.navigate(['/profile']);
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
