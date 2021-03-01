import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackBarService } from '@app/shared/services/app-snack-bar.service';

export enum FriendCardMode {
  // 默认模式
  DEFALUT,
  // 预览模式
  PREVIEW,
}

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent implements OnInit {
  constructor(private _appSnackBar: AppSnackBarService) {}
  MIN_WINTH = 333;
  @Input() title?: string =
    '我是标题我是标题我是标题我是标题我是标题我是标题我是标题';
  @Input() subtitle?: string =
    '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述';
  @Input() avatar?: string;
  @Input() link?: string;
  @Input() mode: FriendCardMode = FriendCardMode.DEFALUT;

  get imgSrc() {
    if (this.avatar && /^https:\/\//.test(this.avatar)) return this.avatar;
    return 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }

  ngOnInit(): void {}
  openLink() {
    if (this.mode !== FriendCardMode.PREVIEW && this.link) {
      if (/^https:\/\//.test(this.link)) {
        window.open(this.link);
      } else {
        this._appSnackBar.error('无法打开不安全的地址');
        throw new Error('无法打开不安全的地址');
      }
    }
  }
}
