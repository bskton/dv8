import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth = false;

  subscription: Subscription;

  title = "dv8";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe(authState => {
      this.isAuth = authState;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
