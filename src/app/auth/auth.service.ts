import { AuthData } from './auth-data.model';
import { User } from './user.model';

export interface AuthService {
  confirmPasswordReset(code: string, password: string);
  getUser(): User;
  login(authData: AuthData): void;
  logout(): void;
  registerUser(authData: AuthData): void;
  sendResetEmail(email: string): void;
  verifyPasswordResetCode(code: string): void;
}
