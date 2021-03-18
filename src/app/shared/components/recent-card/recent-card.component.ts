import { Component, OnInit } from '@angular/core';
import {
  ArticleApiService,
  ArticleApiType,
} from '@app/core/api/article-api.service';
import { recentCardAnimation } from '../../animation/recent-card.animation';

@Component({
  selector: 'app-recent-card',
  templateUrl: './recent-card.component.html',
  styleUrls: ['./recent-card.component.scss'],
  animations: [recentCardAnimation],
})
export class RecentCardComponent implements OnInit {
  constructor(private _articleApi: ArticleApiService) {}
  list: ArticleApiType.Response.IndexData[] = [];
  listTotal = 0;
  loading = true;

  ngOnInit(): void {
    this.requestArticleIndex();
  }

  // 这里的理想情况其实是最好能从 home 页直接取已经请求好的数据来用
  // 但实际情况是我没想到什么比较好的方法能最大化利用
  // 所以直接请求吧:(
  requestArticleIndex() {
    this.loading = true;
    this._articleApi
      .index({ page: 0, pageSize: 5 })
      .subscribe(({ data: { data } }) => {
        
        this.list = data;
        this.listTotal = data.length;
        this.loading = false;
      });
  }
}
