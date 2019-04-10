import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-password-restore',
  templateUrl: './password-restore.component.html',
  styleUrls: ['./password-restore.component.scss']
})
export class PasswordRestoreComponent implements OnInit {

  constructor(@Inject('AuthService') private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.sendResetEmail(form.value.email);
  }
}
