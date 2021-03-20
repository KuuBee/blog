import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace RpcApiType {
  export namespace Response {
    export type GetBlogInfo = ApiType.SuccessResponse<GetBlogInfoData>;
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
}
