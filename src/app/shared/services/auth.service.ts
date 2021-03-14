import { Injectable } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { AppSnackBarService } from './app-snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _userInfo: UserInfoService,
    private _snackBar: AppSnackBarService
  ) {}
  get authorizationToken() {
    const token = localStorage.token ?? '';
    return `Bearer ${token}`;
  }
  get isLogin(): boolean {
    return !!this._userInfo.token.split('Bearer ')[1];
  }
  // 登出
  logout() {
    window.localStorage.clear();
    this._snackBar.success('登出成功');
  }
}
