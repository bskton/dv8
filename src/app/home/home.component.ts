import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news: Observable<{}[]>;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.news = this.newsService.init();
  }
}
