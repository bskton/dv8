import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(@Inject('AuthService') private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.initAuthState()
      .pipe(
        tap((x: boolean) => {
          this.redirectToProfileIfUserAuthenticated(x);
        }),
        map((x: boolean) => {
          return this.activateRouteIfUserUnauthenticated(x);
        })
      );
  }

  private redirectToProfileIfUserAuthenticated(x: boolean) {
    if (x) {
      this.router.navigate(['/profile']);
    }
  }

  private activateRouteIfUserUnauthenticated(x: boolean) {
    return !x;
  }
}
