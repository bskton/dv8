import { Component, Inject, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  constructor(
    @Inject('ProfileService') private profileService: ProfileService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.profileService.init()
      .subscribe((profile: Profile) => {
        this.profileForm.patchValue(profile);
      });
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
}
