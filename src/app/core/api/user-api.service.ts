import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export namespace UserApiType {
  export interface Create {
    name: string;
    // 暂不考虑头像问题
    // avatar?: string;
    password: string;
    email: string;
  }
  // export interface
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private _http: HttpClient) {}
  private readonly _moduleUrl = '/user';
  create(data: UserApiType.Create) {
    return this._http.post(this._moduleUrl, data);
  }
}
