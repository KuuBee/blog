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
  // TODO 这里关于权限的东西应该迁移值 auth service 中
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
    const list1 = Array.from(document.querySelectorAll('ruby rb span'));
    const list2 = Array.from(document.querySelectorAll('.xtb-image span'));
    const res1 = list1.map((item) => item.innerHTML);
    const res2 = list2.map((item) => item.innerHTML);
    console.log(res1);
    console.log(res2);
    const res = res1.map((item, index) => ({
      name: item,
      trueName: res2[index],
    }));
    console.log(res);
    JSON.stringify(res);

    return this._userInfo.name;
  }
}
