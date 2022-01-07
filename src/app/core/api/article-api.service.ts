import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchListService } from '@app/shared/services/search-list.service';
import { combineLatest, of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { ApiBase, ApiType } from '.';
import { SearchApiType } from './search-api.service';

export namespace ArticleApiType {
  export namespace Parameter {
    export interface Index extends ApiType.PaginationParameter {
      tagId?: string;
      classificationId?: string;
    }
  }
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
      introduction?: string
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
  index(query: ArticleApiType.Parameter.Index) {
    return combineLatest([
      this._http.get<ArticleApiType.Response.Index>(this._baseUrl, {
        params: query as any,
      }),
      this._searchList.tagObs$.pipe(take(1)),
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
      this._searchList.tagObs$.pipe(take(1)),
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

  sortFromYearPipe() {
    return concatMap((val: ArticleApiType.Response.Index) => {
      const data = val.data.data;
      let currentYear = NaN;
      let res: ArticleApiType.Response.IndexData[][] = [];
      let currentIndex = NaN;
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const _currentYear = new Date(item.createdAt).getFullYear();
        if (currentYear !== _currentYear) {
          currentYear = _currentYear;
          currentIndex = Number.isNaN(currentIndex) ? 0 : currentIndex + 1;
          res.push([item]);
        } else {
          res[currentIndex].push(item);
        }
      }
      return of(res);
    });
  }
}
