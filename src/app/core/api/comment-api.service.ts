import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType, CommentBase } from '.';

export namespace CommentApiType {
  export namespace Parameter {
    export interface Create {
      articleId: number | string;
      content: string;
      os: string;
      browser: string;
    }
    export interface Index {
      commentId?: string;
      articleId?: string;
    }
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse;
    export type Index = ApiType.SuccessResponse<IndexData[]>;

    export interface IndexData extends CommentBase {
      replyCount: number;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class CommentApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/comment');
  }

  create(data: CommentApiType.Parameter.Create) {
    return this._http.post<CommentApiType.Response.Create>(this._baseUrl, data);
  }

  index(params: CommentApiType.Parameter.Index) {
    return this._http.get<CommentApiType.Response.Index>(this._baseUrl, {
      params: params as any,
    });
  }
}
