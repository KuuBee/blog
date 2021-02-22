import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchListService } from '@app/shared/services/search-list.service';
import { combineLatest, of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { ApiBase, ApiType } from '.';
import { SearchApiType } from './search-api.service';

export namespace ArticleApiType {
  export namespace Response {
    export type Index = ApiType.SuccessResponse<
      ApiType.PaginationResponse<IndexData>
    >;
    export type Info = ApiType.SuccessResponse<InfoData>;
    export interface IndexData {
      articleId: number;
      title: string;
      tagId: number[];
      tag: SearchApiType.Response.IndexData[];
      createdAt: string;
      updatedAt: string;
      classification: Classification;
      firstParagraph: string;
    }
    export interface InfoData {
      articleId: number;
      title: string;
      articleLink: string;
      tagId: number[];
      tag: SearchApiType.Response.IndexData[];
      createdAt: string;
      updatedAt: string;
      classification: Classification;
    }
    export interface Classification {
      classificationId: number;
      content: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService extends ApiBase {
  constructor(
    private _http: HttpClient,
    private _searchList: SearchListService
  ) {
    super('/article');
  }
  index(page: number = 0) {
    return combineLatest([
      this._http.get<ArticleApiType.Response.Index>(this._baseUrl, {
        params: {
          page: page.toString(),
        },
      }),
      this._searchList.tagSub$.pipe(take(1)),
    ]).pipe<ArticleApiType.Response.Index>(
      concatMap((res) => {
        const [articleRes, tagRes] = res;
        articleRes.data.data = articleRes.data.data.map((item) => {
          item.tag = item.tagId.map((subItem) => {
            return tagRes[
              tagRes.findIndex((findItem) => findItem.id === subItem)
            ];
          });
          return item;
        });
        return of(articleRes);
      })
    );
  }

  info(id: string) {
    return combineLatest([
      this._http.get<ArticleApiType.Response.Info>(`${this._baseUrl}/${id}`),
      this._searchList.tagSub$.pipe(take(1)),
    ]).pipe(
      concatMap((res) => {
        const [articleRes, tagRes] = res;
        articleRes.data.tag = articleRes.data.tagId.map((subItem) => {
          return tagRes[
            tagRes.findIndex((findItem) => findItem.id === subItem)
          ];
        });
        return of(articleRes);
      })
    );
  }
}
