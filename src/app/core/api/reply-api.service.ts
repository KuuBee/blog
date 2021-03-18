import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType, CommentBase } from '.';

export namespace ReplyApiType {
  export enum ReplyType {
    REPLY = 'reply',
    COMMENT = 'comment',
  }
  export namespace Parameter {
    export interface Create {
      articleId: number | string;
      commentId: number;
      replyId?: number;
      content: string;
      os: string;
      browser: string;
      replyType: ReplyType;
    }
    export interface Index {
      articleId?: string;
      commentId?: string;
    }
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse;
    export type Index = ApiType.SuccessResponse<IndexData[]>;
    export interface IndexData extends CommentBase {
      replyId: number;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ReplyApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/reply');
  }
  create(body: ReplyApiType.Parameter.Create) {
    return this._http.post<ReplyApiType.Response.Create>(this._baseUrl, body);
  }
  index(params?: ReplyApiType.Parameter.Index) {
    return this._http.get<ReplyApiType.Response.Index>(this._baseUrl, {
      params: params as any,
    });
  }
}
