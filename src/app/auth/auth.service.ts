import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Observable, Subject } from 'rxjs';

export interface AuthService {
  getUser(): User;
  getAuthChange(): Subject<boolean>;
  getUserObservable(): Observable<any>;
  init(): void;
  isAuth(): Observable<any>;
  login(authData: AuthData): void;
  logout(): void;
  registerUser(authData: AuthData): void;
}