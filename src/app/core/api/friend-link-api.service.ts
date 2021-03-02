import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace FriendLinkApiType {
  export namespace Parameter {
    export interface Create {
      title: string;
      subtitle: string;
      link: string;
      avatarLink: string;
    }
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse;
    export type Index = ApiType.SuccessResponse<IndexData[]>;
    export interface IndexData {
      title: string;
      subtitle: string;
      link: string;
      avatarLink: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class FriendLinkApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/friend-link');
  }
  create(data: FriendLinkApiType.Parameter.Create) {
    return this._http.post<FriendLinkApiType.Response.Create>(
      this._baseUrl,
      data
    );
  }
  index() {
    return this._http.get<FriendLinkApiType.Response.Index>(this._baseUrl);
  }
}
