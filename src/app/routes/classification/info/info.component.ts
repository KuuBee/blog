import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import {
  ClassificationApiService,
  ClassificationApiType,
} from '@app/core/api/classification-api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _classificationApi: ClassificationApiService,
    private _articleApi: ArticleApiService
  ) {}

  classId?: string;
  classInfo?: ClassificationApiType.Response.InfoData;
  articleArr: ArticleApiType.Response.IndexData[][] = [];
  loading = false;

  ngOnInit(): void {
    this._route.params.subscribe((res) => {
      this.classId = res.id;
      this.requestClassInfo();
      this.requestArticleIndex();
    });
  }
  requestClassInfo() {
    if (!this.classId) throw new Error('缺少 classId ！');
    this._classificationApi.info(this.classId).subscribe((res) => {
      this.classInfo = res.data;
    });
  }
  requestArticleIndex() {
    if (!this.classId) throw new Error('缺少 classId ！');
    this.loading = true;
    this._articleApi
      .index({
        pageSize: 9999,
        page: 0,
        classificationId: this.classId,
      })
      .pipe(this._articleApi.sortFromYearPipe())
      .subscribe(
        (res) => {
          this.articleArr = res;
        },
        () => {},
        () => (this.loading = false)
      );
  }
}
