import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Observable } from 'rxjs';

export interface AuthService {
  authState(): Observable<boolean>;
  confirmPasswordReset(code: string, password: string);
  getUser(): User;
  isAuthenticated(): Observable<boolean>;
  login(authData: AuthData): void;
  logout(): void;
  registerUser(authData: AuthData): void;
  sendResetEmail(email: string): void;
  verifyPasswordResetCode(code: string): void;
}
