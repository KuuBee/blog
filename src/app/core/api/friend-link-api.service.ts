import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase } from '.';

export namespace FriendLinkApiType {
  export namespace Parameter {
    export interface Create {
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
    return this._http.post(this._baseUrl, data);
  }
}
