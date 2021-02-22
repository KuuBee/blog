import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(
    private _articleApi: ArticleApiService,
    private _route: ActivatedRoute
  ) {}
  articleId: string = '';
  articleInfo?: ArticleApiType.Response.InfoData;
  loading = true;

  get articleLink() {
    if (environment.production) {
      return this.articleInfo?.articleLink;
    }
    return 'https://autocode.icu/assets/markdown/test_markdown.md';
  }

  ngOnInit(): void {
    this._route.params.subscribe((res) => {
      this.articleId = res.id;
      this.requestArticleInfo();
    });
  }
  requestArticleInfo() {
    this.loading = true;
    this._articleApi.info(this.articleId).subscribe((res) => {
      console.log(res);
      this.articleInfo = res.data;
      this.loading = false;
    });
  }
}
