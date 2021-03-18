/*
 * @Descripttion: 拦截请求头添加token验证
 * @Author: KuuBee
 * @Date: 2021-01-17 10:16:44
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-18 09:47:07
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
