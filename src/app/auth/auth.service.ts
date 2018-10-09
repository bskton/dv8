import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

export class AuthService {
  public authChange = new Subject<boolean>();

  private user: User;

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true);
  }

  getUser(): User {
    return { ...this.user };
  }
}