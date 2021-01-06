import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  animations: [
    trigger('openClose', [
      transition('*<=>*', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(
          '370ms cubic-bezier(0.050, 0.740, 0.175, 0.795)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ],
})
export class UserCardComponent implements OnInit {
  constructor(public userInfo: UserInfoService) {}
  // @HostBinding('@openClose')
  // a = true;
  readonly articleInfoIcons = [
    {
      icon: 'article',
      tips: '文章',
    },
    {
      icon: 'class',
      tips: '分类',
    },
    {
      icon: 'label',
      tips: '标签',
    },
  ];
  ngOnInit(): void {}
}
