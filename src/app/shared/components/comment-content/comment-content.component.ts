import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import browserInfo from 'browser-info';
import { ReplyApiType } from '@app/core/api/reply-api.service';
import { CommentBase } from '@app/core/api';
import { CommentDataType } from '@app/routes/article/info/article.component';
import { CommentService } from '@app/shared/services/comment.service';
import { Subscription } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
  styleUrls: ['./comment-content.component.scss'],
})
export class CommentContentComponent implements OnInit, OnDestroy {
  constructor(
    private _comment: CommentService,
    private _mediaObserver: MediaObserver
  ) {}
  @Input() recursion: boolean = true;
  @Input() type: 'comment' | 'reply' = 'comment';
  @Input() comment?: CommentDataType;
  @Input() reply?: ReplyApiType.Response.IndexData;
  @Input() articleId!: number | string;

  // 控制是否显示输入框
  showComment = false;
  commentSub?: Subscription;
  isXs = false;

  get data(): CommentBase | undefined {
    if (this.type === 'comment') return this.comment;
    return this.reply;
  }
  get avatar() {
    if (this.data?.avatar) return this.data.avatar;
    return 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }
  get browserInfoText() {
    const data = browserInfo();
    return `${data.name} ${data.version}/${data.os}`;
  }
  get avatarStyle() {
    const background = `url(${this.avatar}) no-repeat center/cover`;
    if (this.recursion) {
      return {
        background,
      };
    } else {
      if (this.isXs) {
        return {
          width: '0',
          height: '0',
          background,
        };
      } else {
        return {
          width: '30px',
          height: '30px',
          background,
        };
      }
    }
  }
  get replyType() {
    if (this.recursion) return ReplyApiType.ReplyType.COMMENT;
    return ReplyApiType.ReplyType.REPLY;
  }
  get commentId(): number {
    if (this.comment) return this.comment.commentId;
    if (this.reply) return this.reply.commentId;
    throw '缺少commentId';
  }
  get replyId() {
    if (this.reply) return this.reply.replyId;
    return undefined;
  }

  ngOnInit(): void {
    this.commentSub = this._comment.mainObs$.subscribe(() => {
      // 每当评论或者回复更新时都隐藏输入框
      this.showComment = false;
    });
    this.isXs = this._mediaObserver.isActive('xs');
  }
  ngOnDestroy() {
    this.commentSub?.unsubscribe();
  }
  trackByItem(_index: number, item: ReplyApiType.Response.IndexData) {
    return item.replyId;
  }
}
