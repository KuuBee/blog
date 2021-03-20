import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { RpcApiService, RpcApiType } from '@app/core/api/rpc-api.service';

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
  constructor(public userInfo: UserInfoService, private _rpc: RpcApiService) {}
  @Input() isShowBoxShadow = true;
  articleInfoIcons: RpcApiType.Response.TagData[] = [];
  get cardStyle() {
    if (!this.isShowBoxShadow)
      return {
        'box-shadow': 'none',
      };
    return {};
  }
  ngOnInit(): void {
    this.getBlogInfo();
  }
  getBlogInfo() {
    this._rpc.getBlogInfo().subscribe(({ data: { tag: tagData } }) => {
      this.articleInfoIcons = tagData;
    });
  }
}
