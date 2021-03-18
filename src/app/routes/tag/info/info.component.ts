import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import { TagApiService, TagApiType } from '@app/core/api/tag-api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _tagApi: TagApiService,
    private _articleApi: ArticleApiService
  ) {}
  id?: string;
  tagInfo?: TagApiType.Response.InfoData;
  archiveArr: ArticleApiType.Response.IndexData[][] = [];
  loading = false;

  ngOnInit(): void {
    this._route.params.subscribe((res) => {
      this.id = res.id;
      this.requestTagInfo();
      this.requestArticleIndex();
    });
  }
  requestTagInfo() {
    if (!this.id) throw new Error('id 丢失');
    this._tagApi.info(this.id).subscribe((res) => {
      this.tagInfo = res.data;
    });
  }
  requestArticleIndex() {
    this.loading = true;
    this._articleApi
      .index({
        page: 0,
        pageSize: 9999,
        tagId: this.id,
      })
      .pipe(this._articleApi.sortFromYearPipe())
      .subscribe(
        (res) => {
          this.archiveArr = res;
        },
        () => {},
        () => (this.loading = false)
      );
  }
}
