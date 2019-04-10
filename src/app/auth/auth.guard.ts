import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AuthService') private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.initAuthState()
      .pipe(
        tap((x: boolean) => {
          this.redirectToSignInIfUserUnauthenticated(x);
        })
      );
  }

  private redirectToSignInIfUserUnauthenticated(x: boolean) {
    if (!x) {
      this.router.navigate(['/signin']);
    }
  }
}
