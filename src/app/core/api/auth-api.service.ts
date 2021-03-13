import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiType } from '.';

export namespace AuthApiType {
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
// TODO 待删除 无用接口
export class AuthApiService {
  constructor(private _http: HttpClient) {}
  private readonly _moduleUrl = '/auth';
  create(data: AuthApiType.Parameter.Create) {
    return this._http.post<AuthApiType.Response.Create>(this._moduleUrl, data);
  }
}
