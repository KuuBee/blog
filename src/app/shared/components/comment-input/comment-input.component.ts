import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommentApiService } from '@app/core/api/comment-api.service';
import { ReplyApiService, ReplyApiType } from '@app/core/api/reply-api.service';
import { markdownEmojiTrigger } from '@app/shared/animation/markdown-emoji.animation';
import { AppDialogService } from '@app/shared/services/app-dialog.service';
import { AppSnackBarService } from '@app/shared/services/app-snack-bar.service';
import { UserInfoService } from '@app/shared/services/user-info.service';
import browserInfo from 'browser-info';
import { Observable, Subscription } from 'rxjs';
import { CommentService } from '@app/shared/services/comment.service';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
  animations: [markdownEmojiTrigger],
})
export class CommentInputComponent implements OnInit, OnDestroy {
  constructor(
    private _appDialogService: AppDialogService,
    private _userInfoService: UserInfoService,
    private _appSnackBarService: AppSnackBarService,
    private _commentApi: CommentApiService,
    private _replyApi: ReplyApiService,
    private _comment: CommentService
  ) {}
  @Input() placeholder = '支持markdown语法;-)';
  @Input() type: 'comment' | 'reply' = 'comment';
  // 仅当 type 为 reply 时 才需要
  @Input() replyType: ReplyApiType.ReplyType = ReplyApiType.ReplyType.COMMENT;
  // reply用
  @Input() commentId!: number;
  @Input() replyId?: number;
  // comment用
  @Input() articleId!: number | string;
  @Input() isShowTips = true;
  @ViewChild('commentTextarea') textareaElementRef!: ElementRef;
  inputText: string = '';
  showEmoji = false;
  dialogSubscription?: Subscription;

  get markdownData() {
    if (this.inputText) {
      return this.inputText;
    } else {
      return '写点什么再来看看吧...';
    }
  }
  get textarea(): HTMLTextAreaElement {
    return this.textareaElementRef?.nativeElement;
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.dialogSubscription?.unsubscribe();
  }
  emojiSelect(code: string) {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const startText = this.inputText.slice(0, start);
    const endText = this.inputText.slice(end, this.inputText.length);
    const selectionRange = startText.length + code.length;
    this.inputText = startText + code + endText;
    setTimeout(() => {
      this.textarea.setSelectionRange(selectionRange, selectionRange);
    }, 0);
  }
  submit() {
    if (this._userInfoService.isLogin) {
      this._submit();
    } else {
      const observable = this._appDialogService.login().afterClosed();
      this.dialogSubscription = observable.subscribe((res) => {
        if (res?.code === 1) {
          this.dialogSubscription?.unsubscribe();
          this._submit();
        }
      });
    }
  }
  private _submit() {
    const info = browserInfo();
    const baseSubmitData = {
      articleId: parseInt(this.articleId.toString()),
      content: this.inputText,
      os: info.os,
      browser: `${info.name} ${info.version}`,
    };
    let obs: Observable<any>;
    if (this.type === 'comment') {
      obs = this._commentApi.create(baseSubmitData);
    } else {
      const replyData = {
        replyType: this.replyType,
        commentId: this.commentId,
        replyId: this.replyId,
      };
      obs = this._replyApi.create({
        ...baseSubmitData,
        ...replyData,
      });
    }
    obs.subscribe((res) => {
      this.showEmoji = false;
      this.inputText = '';
      this.textarea.blur();
      this._comment.commentUpdate();
      // this._appSnackBarService.success('评论成功');
    });
  }
}
