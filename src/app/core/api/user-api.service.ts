import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiType } from '.';

export namespace UserApiType {
  export namespace Parameter {
    export interface Create {
      name: string;
      avatar?: File;
      defaultAvatar?: string;
      password: string;
      email: string;
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
export class UserApiService {
  constructor(private _http: HttpClient) {}
  private readonly _moduleUrl = '/user';
  create(data: UserApiType.Parameter.Create) {
    return this._http.post<UserApiType.Response.Create>(this._moduleUrl, {
      ...data,
      formDataType: true,
    });
  }
  test() {
    return this._http.post(
      '/',
      {
        aa: '11',
      },
      {
        params: {
          a: '1',
          b: '2',
          cd: '3',
        },
      }
    );
  }
}
