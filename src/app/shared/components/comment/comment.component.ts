import { Component, Input, OnInit } from '@angular/core';
import { CommentApiType } from '@app/core/api/comment-api.service';
import { ReplyApiType } from '@app/core/api/reply-api.service';
import { CommentDataType } from '@app/routes/article/info/article.component';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor() {}
  @Input() type: 'comment' | 'reply' = 'comment';
  @Input() commentDataArr?: CommentDataType[];
  @Input() articleId!: number | string;
  @Input() loading = false;

  ngOnInit(): void {}
  trackByItem(_index: number, item: CommentDataType) {
    return item.commentId;
  }
}
