import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';

export interface AuthService {
  registerUser(authData: AuthData): void;
  login(authData: AuthData): void;
  logout(): void;
  getUser(): User;
  getAuthChange(): Subject<boolean>;
}