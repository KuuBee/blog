import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  constructor(private _articleApi: ArticleApiService) {}

  archiveArr: ArticleApiType.Response.IndexData[][] = [];

  ngOnInit(): void {
    this.requestArticleIndex();
  }
  requestArticleIndex() {
    this._articleApi
      .index({ pageSize: 9999, page: 0 })
      .pipe(this._articleApi.sortFromYearPipe())
      .subscribe((res) => {
        this.archiveArr = res;
      });
  }
}
