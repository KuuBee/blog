import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace SearchApiType {
  // 与服务器的 SearchType 同步
  export enum SearchType {
    TAG = 'tag',
    CLASSIFICATION = 'classification',
    ARTICLE = 'article',
  }
  export namespace Response {
    export type Index = ApiType.SuccessResponse<IndexData[]>;
    export interface IndexData {
      id: number;
      name: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class SearchApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/search');
  }
  index(type: SearchApiType.SearchType) {
    return this._http.get<SearchApiType.Response.Index>(this._baseUrl, {
      params: {
        type,
      },
    });
  }
}
