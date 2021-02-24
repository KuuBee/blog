import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  articleCardAnimation,
  homePageAnimation,
} from '../shared/animation/home.animation';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import { environment } from 'src/environments/environment';
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

  get isShowEnd(): boolean {
    const hasScroll = this._appUtils.hasScroll();
    return this.isLast && hasScroll && !!this.articleArr.length;
  }

  ngOnInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      () => {
        if (!this.loading) {
          this.requestArticleIndex(this.currentPage + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    // obs.observe(document.)
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
        console.log(res);
        const data = res.data;
        this.articleArr.push(...data.data);
        this.currentPage = data.pagination.currentPage;
        this.isLast = data.pagination.isLast;
        this.loading = false;
        setTimeout(() => {
          if (this.isLast) {
            // this.intersectionObserver?.unobserve(this.loadingRef.nativeElement);
            this.intersectionObserver?.disconnect();
            return;
          }
          if (this.needWatch) {
            this.intersectionObserver?.observe(this.loadingRef.nativeElement);
            this.needWatch = false;
          }
        }, 100);
      });
  }
  trackById(index: number, item: ArticleIndexData) {
    return item.articleId;
  }
}
