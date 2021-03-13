import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import { environment } from 'src/environments/environment';
import {
  CommentApiService,
  CommentApiType,
} from '@app/core/api/comment-api.service';
import { ReplyApiService, ReplyApiType } from '@app/core/api/reply-api.service';
import { CommentService } from '@app/shared/services/comment.service';
import { Subscriber, Subscription } from 'rxjs';

export interface CommentDataType extends CommentApiType.Response.IndexData {
  reply: ReplyApiType.Response.IndexData[];
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  constructor(
    private _articleApi: ArticleApiService,
    private _commentApi: CommentApiService,
    private _replyApi: ReplyApiService,
    private _route: ActivatedRoute,
    private _comment: CommentService
  ) {}
  articleId: string = '';
  articleInfo?: ArticleApiType.Response.InfoData;
  loading = true;
  commentLoading = true;
  intersectionObs?: IntersectionObserver;
  private _commentArr: CommentApiType.Response.IndexData[] = [];
  commentDataArr: CommentDataType[] = [];
  commentSub?: Subscription;

  get articleLink() {
    if (environment.production) {
      return this.articleInfo?.articleLink;
    }
    // 浏览器无法通过js跳转本地文件
    return 'https://autocode.icu/assets/markdown/test_markdown.md';
  }

  ngOnInit(): void {
    this._route.params.subscribe((res) => {
      this.articleId = res.id;
      this.requestArticleInfo();
    });
    this.commentSub = this._comment.mainObs$.subscribe(() => {
      this.requestCommentIndex();
    });
  }
  ngOnDestroy() {
    this.intersectionObs?.disconnect();
    this.commentSub?.unsubscribe();
  }
  requestArticleInfo() {
    this.loading = true;
    this._articleApi.info(this.articleId).subscribe((res) => {
      console.log(res);
      this.articleInfo = res.data;
      this.loading = false;
    });
  }
  requestCommentIndex() {
    this.commentLoading = true;
    this._commentApi.index({ articleId: this.articleId }).subscribe((res) => {
      console.log('评论', res);
      this._commentArr = res.data;
      this.intersectionObs?.disconnect();
      this.requestReplyIndex();
    });
  }
  requestReplyIndex() {
    this._replyApi
      .index({
        articleId: this.articleId,
      })
      .subscribe((res) => {
        console.log('回复', res.data);
        this.commentDataArr = this._commentArr.map((item) => {
          const newItem = item as CommentDataType;
          newItem.reply = res.data.filter(
            (filterItme) => filterItme.commentId === item.commentId
          );
          return newItem;
        });
        console.log('this.commentDataArr', this.commentDataArr);
        this.commentLoading = false;
      });
  }
  onLoad() {
    this.intersectionObs = new IntersectionObserver(
      ([first]) => {
        if (first.isIntersecting) {
          this.requestCommentIndex();
        }
      },
      {
        threshold: 0.1,
      }
    );
    const ele = document.querySelector('app-comment');
    if (ele) this.intersectionObs.observe(ele);
  }
}
