import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { AuthService } from './auth/auth.service';
import { of, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isAuth = false;

  subscription: Subscription;

  env = environment.env;

  constructor(@Inject('AuthService') private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.getAuthChange().subscribe(authState => {
      this.isAuth = authState;
    });
    this.authService.init();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onLogout() {
    this.sidenav.close();
    this.authService.logout();
  }
}
