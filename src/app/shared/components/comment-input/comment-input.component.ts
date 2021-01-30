import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { markdownEmojiTrigger } from '@app/shared/animation/markdown-emoji.animation';
import { AppDialogService } from '@app/shared/services/app-dialog.service';
import { AppSnackBarService } from '@app/shared/services/app-snack-bar.service';
import { UserInfoService } from '@app/shared/services/user-info.service';
import { Subscription } from 'rxjs';

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
    private _appSnackBarService: AppSnackBarService
  ) {}
  @Input() placeholder = 'emmmm';
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

  ngOnInit(): void {
    // this._appDialogService.login();
  }
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
    this.showEmoji = false;
    this.inputText = '';
    setTimeout(() => {
      this._appSnackBarService.success('评论成功');
      this.textarea.blur();
    }, 0);
  }
}
