import {
  animate,
  animation,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { searchBarAnimation } from 'src/app/shared/animation/app-search.animation';

@Component({
  selector: 'app-recent-card',
  templateUrl: './recent-card.component.html',
  styleUrls: ['./recent-card.component.scss'],
  animations: [
    trigger('recentCardAnimation', [
      transition(':increment', [
        query(
          '.aim-tag',
          [
            style({ opacity: 0, transform: 'translateX(100px)' }),
            stagger(100, [
              animate(
                '370ms cubic-bezier(0.050, 0.740, 0.175, 0.795)',
                style({ opacity: 1, transform: 'none' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class RecentCardComponent implements OnInit {
  constructor() {}
  list: any[] = [];
  listTotal = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.list = [1, 2, 3, 4];
      this.listTotal = this.list.length;
    }, 1000);
  }
}
