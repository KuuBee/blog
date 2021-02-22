import { Component, OnInit } from '@angular/core';
import { recentCardAnimation } from '../../animation/recent-card.animation';

@Component({
  selector: 'app-recent-card',
  templateUrl: './recent-card.component.html',
  styleUrls: ['./recent-card.component.scss'],
  animations: [recentCardAnimation],
})
export class RecentCardComponent implements OnInit {
  constructor() {}
  list: any[] = [];
  listTotal = 0;
  loading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.list = [1, 2, 3, 4, 5];
      this.listTotal = this.list.length;
      this.loading = false;
    }, 1000);
  }
}
