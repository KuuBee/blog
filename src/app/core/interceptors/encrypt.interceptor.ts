/*
 * @Descripttion: 加密拦截器
 * @Author: 杨湛杰
 * @Date: 2021-01-25 11:50:23
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-25 14:49:52
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppCryptoService } from '@app/shared/services/app-crypto.service';
import { GlobalType } from '@app/shared/interface';

@Injectable()
export class EncryptInterceptor implements HttpInterceptor {
  constructor(private _appCryptoService: AppCryptoService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req: HttpRequest<unknown>;
    let encryptParams: GlobalType.StrKeyObj = {};
    // aes key
    const aesKey = this._appCryptoService.generateKey();
    // paramsKeys 的 key
    const paramsKeys = request.params.keys();
    if (request.method !== 'GET') {
      // console.log('body', request.body);
    }
    if (paramsKeys.length) {
      paramsKeys.forEach((item, index) => {
        const params = request.params.get(item);
        encryptParams[`params${index + 1}`] = this._appCryptoService.aesEncrypt(
          JSON.stringify({ [item]: params }),
          aesKey
        );
      });
    }
    req = request.clone({
      params: new HttpParams({
        fromObject: encryptParams,
      }),
    });
    console.log(req);

    return next.handle(req);
  }
}
