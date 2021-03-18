/*
 * @Descripttion: 用于保存和存储最近的5篇文章
 * @Author: KuuBee
 * @Date: 2021-03-18 09:48:19
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-18 09:49:45
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArticleApiType } from '../../core/api/article-api.service';

type ArticleData = ArticleApiType.Response.IndexData;

@Injectable({
  providedIn: 'root',
})
export class RecentArticleService {
  constructor() {}
  recentArticleList$: BehaviorSubject<ArticleData[]> = new BehaviorSubject<
    ArticleData[]
  >([]);

}
