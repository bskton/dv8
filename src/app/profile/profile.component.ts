import { Component, Inject, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(@Inject('ProfileService') private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.init()
      .subscribe((profile: Profile) => {
        this.profileForm.patchValue(profile);
      });
  }

  onSubmit() {
    console.log(this.profileForm);
    this.profileForm.reset(this.profileForm.value);
  }
}
