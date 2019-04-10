import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isAuth: Observable<boolean>;

  env = environment.env;

  constructor(@Inject('AuthService') private authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.initAuthState();
  }

  onLogout() {
    this.sidenav.close();
    this.authService.logout();
  }
}
