/*
 * @Descripttion: 拦截请求头添加token验证
 * @Author: 杨湛杰
 * @Date: 2021-01-17 10:16:44
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-19 11:33:06
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfoService } from '@app/shared/services/user-info.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _userInfoService: UserInfoService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      headers: request.headers.set(
        'Authorization',
        this._userInfoService.token
      ),
    });
    return next.handle(req);
  }
}
