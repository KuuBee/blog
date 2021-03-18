import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { articleCardAnimation } from '../shared/animation/home.animation';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import { AppUtilsService } from '@app/shared/services/app-utils.service';

type ArticleIndexData = ArticleApiType.Response.IndexData;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [articleCardAnimation],
  // homePageAnimation
})
export class HomeComponent implements OnInit {
  constructor(
    private _articleApi: ArticleApiService,
    private _appUtils: AppUtilsService
  ) {}
  @ViewChild('loading') loadingRef!: ElementRef;
  // @HostBinding('@homePageAnimation')
  // animatePage = true;
  currentPage = 0;
  articleArr: ArticleIndexData[] = [];
  isLast = true;
  intersectionObserver?: IntersectionObserver;
  needWatch = true;
  loading = false;
  isShowEnd = false;

  ngOnInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      ([first]) => {
        if (!this.loading && first.isIntersecting) {
          this.requestArticleIndex(this.currentPage + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    this.requestArticleIndex();
  }
  requestArticleIndex(page = 0) {
    this.loading = true;
    this._articleApi
      .index({
        page,
        pageSize: 5,
      })
      .subscribe((res) => {
        const data = res.data;
        this.articleArr.push(...data.data);
        this.currentPage = data.pagination.currentPage;
        this.isLast = data.pagination.isLast;
        this.loading = false;
        setTimeout(() => {
          if (this.isLast) {
            this.intersectionObserver?.disconnect();
            return;
          }
          if (this.needWatch) {
            this.intersectionObserver?.observe(this.loadingRef.nativeElement);
            this.needWatch = false;
          }
          this.calcIsShowEnd();
        }, 100);
      });
  }
  trackById(_index: number, item: ArticleIndexData) {
    return item.articleId;
  }
  async calcIsShowEnd() {
    const hasScroll = await this._appUtils.hasScroll();
    this.isShowEnd = this.isLast && hasScroll && !!this.articleArr.length;
  }
}
