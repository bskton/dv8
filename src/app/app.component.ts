import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import * as fromApp from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isAuth: Observable<boolean>;

  env = environment.env;

  constructor(@Inject('AuthService') private authService: AuthService, private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.isAuth = this.store.select(fromApp.getIsAuthenticated);
  }

  onLogout() {
    this.sidenav.close();
    this.authService.logout();
  }
}
