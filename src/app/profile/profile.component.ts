import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import { StoryService } from '../stories/story.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  stories: Observable<any>;

  constructor(@Inject('StoryService') private storyService: StoryService) { }

  ngOnInit() {
    this.stories = this.storyService.init();
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
  }
}
