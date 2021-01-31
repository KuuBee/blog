import { Component, OnInit } from '@angular/core';
import { AppScrollService } from '@app/shared/services/app-scroll.service';
import { fromEvent } from 'rxjs';
import { AppDomService } from '@app/shared/services/app-dom.service';
import { floatingActionButtonRemoveTrigger } from '../../animation/floating-action-button';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
  animations: [floatingActionButtonRemoveTrigger],
})
export class FloatingActionButtonComponent implements OnInit {
  constructor(
    private _appScrollService: AppScrollService,
    private _appDomService: AppDomService
  ) {}
  likeButtonStatus: boolean | null = null;
  dislikeButtonStatus: boolean | null = null;
  anchorDom?: Element;
  isShowBackTop = false;
  get likeButtonClass() {
    return {
      'floating-action-button__like--active': this.likeButtonStatus,
      'floating-action-button__like--default': !(this.likeButtonStatus ?? true),
    };
  }
  get dislikeButtonClass() {
    return {
      'floating-action-button__dislike--active': this.dislikeButtonStatus,
      'floating-action-button__dislike--default': !(
        this.dislikeButtonStatus ?? true
      ),
    };
  }

  ngOnInit(): void {
    // 锚点DOM肯定存在 所以直接 as 了
    // 初始化获取锚点元素
    this.anchorDom = document.getElementById('app__anchor') as Element;
    this.showBackTop();
  }
  showBackTop() {
    const SCROLL_DOM: Element = document.getElementsByClassName(
      'app__content'
    )[0];
    fromEvent(SCROLL_DOM, 'scroll').subscribe(() => {
      this.isShowBackTop =
        (this.anchorDom?.getClientRects()[0].top ?? 0) <
        -(this._appDomService.bodyheight ?? 500);
    });
  }
  clickButton(type: 'like' | 'dislike' | 'bug' = 'like') {
    console.log(type);

    switch (type) {
      case 'like':
        this.likeButtonStatus = !this.likeButtonStatus;
        if (this.likeButtonStatus && this.dislikeButtonStatus) {
          this.dislikeButtonStatus = false;
        } else {
          this.dislikeButtonStatus = null;
        }
        break;
      case 'dislike':
        this.dislikeButtonStatus = !this.dislikeButtonStatus;
        if (this.dislikeButtonStatus && this.likeButtonStatus) {
          this.likeButtonStatus = false;
        } else {
          this.likeButtonStatus = null;
        }
        break;

      default:
        throw new Error('错误类型');
    }
  }
  scollTop() {
    if (!this.anchorDom) {
      this.anchorDom = document.getElementById('app__anchor') as Element;
    }
    this._appScrollService.scrollIntoView(this.anchorDom);
  }
}
