import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackBarService } from '@app/shared/services/app-snack-bar.service';

export enum FriendCardMode {
  // 默认模式
  DEFALUT,
  // 预览模式
  PREVIEW,
}
// 最小宽度
// 你问我怎么算出来的 当然是控制台查看元素宽度的啊！
export const FRIEND_CARD_COMPONENT_MIN_WIDTH = 333;

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent implements OnInit {
  constructor(private _appSnackBar: AppSnackBarService) {}
  @Input()
  get title(): string {
    if (this._title) return this._title;
    return '我是标题我是标题我是标题我是标题我是标题我是标题我是标题';
  }
  set title(val: string) {
    this._title = val;
  }

  @Input()
  get subtitle(): string {
    if (this._subtitle) return this._subtitle;
    return '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述';
  }
  set subtitle(val: string) {
    this._subtitle = val;
  }
  @Input()
  get avatar() {
    if (this._avatar && /^https:\/\//.test(this._avatar)) return this._avatar;
    return 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }
  set avatar(val: string) {
    this._avatar = val;
  }
  @Input() link?: string;
  @Input() mode: FriendCardMode = FriendCardMode.DEFALUT;

  private _title!: string;
  private _subtitle!: string;
  private _avatar!: string;

  // get imgSrc() {
  //   if (this.avatar && /^https:\/\//.test(this.avatar)) return this.avatar;
  //   return 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  // }

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
