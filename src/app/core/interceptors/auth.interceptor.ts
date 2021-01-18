/*
 * @Descripttion: 拦截请求头添加token验证
 * @Author: 杨湛杰
 * @Date: 2021-01-17 10:16:44
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-17 14:56:48
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      headers: request.headers.set(
        'Authorization',
        this._authService.authorizationToken
      ),
    });
    return next.handle(req);
  }
}
