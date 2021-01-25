import { Injectable } from '@angular/core';

export namespace UserInfoServiceType {
  export interface Info {
    token: string;
    avatar: string | null;
    name: string;
  }
}
@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor() {}
  readonly ownerName = 'KuuBee';
  readonly motto = '相信心就是你的魔法 耶～';
  readonly city = 'Nanjing';
  readonly country = 'China';
  setUserInfo(data: UserInfoServiceType.Info) {
    const JsonStr = JSON.stringify(data);
    localStorage.userInfo = JsonStr;
  }
  private get _userInfo(): UserInfoServiceType.Info {
    const { token, avatar, name } = JSON.parse(localStorage.userInfo ?? '{}');
    return {
      token: `Bearer ${token ?? ''}`,
      avatar: avatar ?? '',
      name: name ?? '',
    };
  }
  get isLogin(): boolean {
    return !!this.token.split('Bearer ')[1];
  }
  get token() {
    return this._userInfo.token;
  }
  get avatar() {
    return this._userInfo.avatar;
  }
  get name() {
    return this._userInfo.name;
  }
}
