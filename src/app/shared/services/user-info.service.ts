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
    return this._userInfo.name;
  }
}
// FIXME 文章详情会自动跳一下记得看一下
// TODO 最近文章模块数据还没搞
// TODO 页面缓存也还没搞
// FIXME 部分按钮和链接 鼠标还会变会手指的状态
// FIXME 分类和标签页pc上图片太大了 要该小点，移动端大小正合适
// TODO 关于页还没写 最好今天晚上搞一下
// TODO 准备第一篇文章
// TODO 这条不一定要搞 fav模块的图片都是在外网上 考虑要不要扣到本地
// TODO 鼠标圈圈在鼠标不在视窗内的情况下 最好隐藏 需要监听一下事件
