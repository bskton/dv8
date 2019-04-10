import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  private code: string;

  constructor(@Inject('AuthService') private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.code = this.route.snapshot.queryParamMap.get('oobCode');
    this.authService.verifyPasswordResetCode(this.code);
  }

  onSubmit(form: NgForm) {
    console.log(form.value.password); // TODO: Remove
    this.authService.confirmPasswordReset(this.code, form.value.password);
  }
}
