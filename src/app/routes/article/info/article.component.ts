import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppUtilsService } from '@app/shared/services/app-utils.service';

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
    private _comment: CommentService,
    private _utils: AppUtilsService
  ) {}
  articleId: string = '';
  articleInfo?: ArticleApiType.Response.InfoData;
  loading = true;
  commentLoading = true;
  intersectionObs?: IntersectionObserver;
  private _commentArr: CommentApiType.Response.IndexData[] = [];
  commentDataArr: CommentDataType[] = [];
  commentSub?: Subscription;
  contentDomSub?: Subscription;

  get articleLink() {
    if (environment.production) {
      return this.articleInfo?.articleLink;
    }
    // 浏览器无法通过js跳转本地文件
    return 'https://autocode.icu/assets/markdown/1615969512395/index.md';
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
    this.contentDomSub?.unsubscribe();
  }
  requestArticleInfo() {
    this.loading = true;
    this._articleApi
      .info(this.articleId)
      .pipe(delay(1000))
      .subscribe((res) => {
        this.articleInfo = res.data;
        this.loading = false;
      });
  }
  requestCommentIndex() {
    this.commentLoading = true;
    this._commentApi.index({ articleId: this.articleId }).subscribe((res) => {
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
        this.commentDataArr = this._commentArr.map((item) => {
          const newItem = item as CommentDataType;
          newItem.reply = res.data.filter(
            (filterItme) => filterItme.commentId === item.commentId
          );
          return newItem;
        });
        this.commentLoading = false;
      });
  }
  onLoad() {
    this.contentDomSub = this._utils.contentDom$.subscribe((res) => {
      if (!res) return;
      res.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
    // 加载完成时 监听底部元素
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
