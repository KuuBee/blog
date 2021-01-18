import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { markdownEmojiTrigger } from '@app/shared/animation/markdown-emoji.animation';
import { AppDialogService } from '@app/shared/services/app-dialog.service';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
  animations: [markdownEmojiTrigger],
})
export class CommentInputComponent implements OnInit {
  constructor(private _appDialogService: AppDialogService) {}
  @Input() placeholder = 'emmmm';
  @ViewChild('commentTextarea') textareaElementRef!: ElementRef;
  inputText: string = '';
  showEmoji = false;
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
    this.showEmoji = false;
    this.inputText = '';
    this._appDialogService.login();
    setTimeout(() => {
      this.textarea.blur();
    }, 0);
  }
}
