import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Observable, Subject } from 'rxjs';

export interface AuthService {
  confirmPasswordReset(code: string, password: string);
  getUser(): User;
  getAuthChange(): Subject<boolean>;
  getUserObservable(): Observable<any>;
  login(authData: AuthData): void;
  logout(): void;
  registerUser(authData: AuthData): void;
  sendResetEmail(email: string): void;
  verifyPasswordResetCode(code: string): void;
}
