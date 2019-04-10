import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../app.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLoading: Observable<boolean>;

  constructor(
    @Inject('AuthService') private authService: AuthService,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.isLoading = this.store.select(fromApp.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

}
