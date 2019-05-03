import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileService } from './profile.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Observable<Profile> | null = null;

  constructor(@Inject('ProfileService') private profileService: ProfileService) { }

  ngOnInit() {
    this.profile = this.profileService.init();
  }
}
