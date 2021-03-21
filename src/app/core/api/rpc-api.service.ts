import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace RpcApiType {
  export namespace Response {
    export type GetBlogInfo = ApiType.SuccessResponse<GetBlogInfoData>;
    export type GetArticlePageContext = ApiType.SuccessResponse<{
      previous: number | null;
      next: number | null;
    }>;
    export interface GetBlogInfoData {
      tag: TagData[];
    }
    export interface TagData {
      icon: string;
      tips: string;
      count: number;
    }
  }
}

/* 
RPC风格api都放在此
*/

@Injectable({
  providedIn: 'root',
})
export class RpcApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/rpc');
  }

  getBlogInfo() {
    return this._http.get<RpcApiType.Response.GetBlogInfo>(
      `${this._baseUrl}/getBlogInfo`
    );
  }
  getArticlePageContext(id: string) {
    return this._http.get<RpcApiType.Response.GetArticlePageContext>(
      `${this._baseUrl}/getArticlePageContext`,
      {
        params: {
          id,
        },
      }
    );
  }
}
