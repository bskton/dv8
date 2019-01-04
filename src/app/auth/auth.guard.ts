import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AuthService') private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuth().pipe(
      switchMap(authState => {
        console.log(authState); // TODO
        if (authState) {
          return of(true);
        } else {
          this.router.navigate(['/signin']);
        }
      })
    );
  }
}
