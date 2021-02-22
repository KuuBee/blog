import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { AppDomService } from '@app/shared/services/app-dom.service';
import { floatingActionButtonRemoveTrigger } from '../../animation/floating-action-button';
import { AppUtilsService } from '@app/shared/services/app-utils.service';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
  animations: [floatingActionButtonRemoveTrigger],
})
export class FloatingActionButtonComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _appDomService: AppDomService,
    private _appUtils: AppUtilsService
  ) {}
  likeButtonStatus: boolean | null = null;
  dislikeButtonStatus: boolean | null = null;
  anchorDom?: Element;
  isShowBackTop = false;
  scrollSubscription?: Subscription;
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
  ngAfterViewInit() {
    // 按钮一初始化就执行一次跳转顶部
    setTimeout(() => {
      this.scollTop();
    }, 500);
  }
  ngOnDestroy() {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  }
  showBackTop() {
    const SCROLL_DOM: Element = this._appUtils.contentDom;
    this.scrollSubscription = fromEvent(SCROLL_DOM, 'scroll').subscribe(() => {
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
    this._appUtils.scrollIntoView(this.anchorDom);
  }
}
