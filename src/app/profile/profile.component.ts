import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  protected profileSubscription: Subscription;

  constructor(
    @Inject('ProfileService') private profileService: ProfileService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.profileSubscription = this.profileService.getProfile()
      .subscribe((p: Profile) => {
        if (p) {
          this.profileForm.patchValue(p);
        }
      });
    this.profileService.init();
  }

  onSubmit() {
    this.profileService.update(this.profileForm.value)
      .then(() => {
        this.snackbar.open('Profile was updated successfully.', null);
        this.profileForm.reset(this.profileForm.value);
      })
      .catch(() => {
        this.snackbar.open('Can not update profile. Please try again later.', null);
      });
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }
}
