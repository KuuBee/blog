import { Component, OnInit } from '@angular/core';
import { AppScrollService } from '@app/shared/services/app-scroll.service';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})
export class FloatingActionButtonComponent implements OnInit {
  constructor(private _appScrollService: AppScrollService) {}
  likeButtonStatus: boolean | null = null;
  dislikeButtonStatus: boolean | null = null;
  anchorDom?: Element;
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
    this.anchorDom = document.getElementById('app__anchor') as Element;
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
