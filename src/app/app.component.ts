import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isAuth = false;

  subscription: Subscription;

  title = "dv8";

  env = environment.env;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe(authState => {
      this.isAuth = authState;
    });
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
