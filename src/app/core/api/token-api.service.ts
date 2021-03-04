import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extend } from 'lodash';
import { ApiBase, ApiType } from '.';

export namespace TokenApiType {
  export namespace Parameter {
    export interface Create {
      name: string;
      password: string;
    }
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse<CreateData>;
    export interface CreateData {
      name: string;
      avatar: string | null;
      accessToken: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class TokenApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/token');
  }
  create(data: TokenApiType.Parameter.Create) {
    return this._http.post<TokenApiType.Response.Create>(this._baseUrl, data);
  }
}
