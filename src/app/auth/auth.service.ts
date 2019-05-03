import { AuthData } from './auth-data.model';
import { Observable } from 'rxjs';

export interface AuthService {
  initAuthState(): Observable<boolean>;
  confirmPasswordReset(code: string, password: string);
  getUser(): Observable<any>;
  isAuthenticated(): Observable<boolean>;
  login(authData: AuthData): void;
  logout(): void;
  registerUser(authData: AuthData): void;
  sendResetEmail(email: string): void;
  verifyPasswordResetCode(code: string): void;
}
