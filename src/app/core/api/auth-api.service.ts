import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiType } from '.';

export namespace AuthApiType {
  export interface Create {
    name: string;
    password: string;
  }
  export type CreateResponse = ApiType.SuccessResponse<CreateResponseData>;
  export interface CreateResponseData {
    accessToken: string;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private _http: HttpClient) {}
  private readonly _moduleUrl = '/auth';
  // 狭义上的登陆
  // 在restful的角度上也可以理解为创建登陆状态
  create(data: AuthApiType.Create) {
    return this._http.post<AuthApiType.CreateResponse>(this._moduleUrl, data);
  }
}
