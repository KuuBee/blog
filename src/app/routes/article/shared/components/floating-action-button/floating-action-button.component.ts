import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, of, Subscription } from 'rxjs';
import { AppDomService } from '@app/shared/services/app-dom.service';
import { floatingActionButtonRemoveTrigger } from '../../animation/floating-action-button';
import { AppUtilsService } from '@app/shared/services/app-utils.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
  animations: [floatingActionButtonRemoveTrigger],
})
export class FloatingActionButtonComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _domService: AppDomService,
    private _utils: AppUtilsService
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
    this.scrollSubscription?.unsubscribe();
  }
  showBackTop() {
    // TODO 其实这里我不太清楚是否会导致事件的重复监听有空研究一下
    this.scrollSubscription = this._utils.contentDom$
      .pipe(
        concatMap((val) => {
          if (!val) return of(null);
          return fromEvent(val, 'scroll');
        })
      )
      .subscribe(() => {
        this.isShowBackTop =
          (this.anchorDom?.getClientRects()[0].top ?? 0) <
          -(this._domService.bodyheight ?? 500);
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
    this._utils.scrollIntoView(this.anchorDom);
  }
}
