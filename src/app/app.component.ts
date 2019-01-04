import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isAuth = false;

  subscription: Subscription;

  userSubscription: Subscription;

  env = environment.env;

  constructor(@Inject('AuthService') private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.getUserObservable().subscribe(user => {
      if (user) {
        this.isAuth = true;
      }
    });
    this.subscription = this.authService.getAuthChange().subscribe(authState => {
      this.isAuth = authState;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onLogout() {
    this.sidenav.close();
    this.authService.logout();
  }
}
