/*
 * @Descripttion: 加密拦截器
 * @Author: 杨湛杰
 * @Date: 2021-01-25 11:50:23
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-29 11:19:21
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AppCryptoService } from '@app/shared/services/app-crypto.service';
import { GlobalType } from '@app/shared/interface';
import { tap, concatMap, catchError } from 'rxjs/operators';

@Injectable()
export class EncryptInterceptor implements HttpInterceptor {
  constructor(private _appCryptoService: AppCryptoService) {}
  // 进行加密是需要跳过的白名单
  private readonly _encryptWhiteList: string[] = [
    // 用于表识当前对象是否需要用formData对象进行包装
    'formDataType',
  ];

  intercept(
    request: HttpRequest<GlobalType.StrKeyObj>,
    next: HttpHandler
  ): Observable<HttpEvent<GlobalType.StrKeyObj>> {
    let req: HttpRequest<GlobalType.StrKeyObj> = request.clone();
    let encryptParams: GlobalType.StrKeyObj = {};
    let body: GlobalType.StrKeyObj = request.body ?? {};
    const aesKey = this._appCryptoService.generateKey();
    const aesIv = this._appCryptoService.generateKey(16);
    // paramsKeys 的 key
    const paramsKeys = request.params.keys();
    const bodyKeys = Object.keys(body);

    // 如果既没有 params 参数
    // 又没有 body 参数
    // 那么就不需要加密直接返回
    if (!paramsKeys.length && !bodyKeys.length) return next.handle(req);

    // body加密
    if (request.method !== 'GET') {
      if (bodyKeys.length) {
        const newBody: GlobalType.StrKeyObj = {};
        bodyKeys.forEach((item, index) => {
          // 如果当前val为文件类型是忽略加密直接跳过
          // 如果当前key在加密白名单中忽略加密直接跳过
          if (
            body[item] instanceof File ||
            this._encryptWhiteList.includes(item)
          ) {
            newBody[item] = body[item];
          } else {
            newBody[`params${index + 1}`] = this._appCryptoService.aesEncrypt(
              JSON.stringify({
                [item]: body[item],
              }),
              aesKey,
              aesIv
            );
          }
        });
        body = newBody;
      }
    }

    // params加密
    if (paramsKeys.length) {
      paramsKeys.forEach((item, index) => {
        const params = request.params.get(item);
        // base64 转码 encodeURIComponent
        encryptParams[`params${index + 1}`] = encodeURIComponent(
          this._appCryptoService.aesEncrypt(
            JSON.stringify({ [item]: params }),
            aesKey,
            aesIv
          )
        );
      });
    }

    // 拼接组合
    req = request.clone({
      // 自定义请求头 传递key和iv
      headers: request.headers.append(
        'Secret-Key',
        this._appCryptoService.rsaEncrypt(
          JSON.stringify({
            key: aesKey,
            iv: aesIv,
          })
        )
      ),
      body,
      params: new HttpParams({
        fromObject: encryptParams,
      }),
      // 加密默认返回字符串
      responseType: 'text',
    });

    return next.handle(req).pipe(
      concatMap((val) => {
        if (val instanceof HttpResponse) {
          const res = JSON.parse(
            this._appCryptoService.aesDecrypt(val.body, aesKey, aesIv)
          );
          console.log('请求结果:', res);

          return of(res);
        } else {
          return of(val);
        }
      }),
      catchError((err) => {
        console.log('HttpInterceptor Error:', err);
        if (err instanceof HttpErrorResponse) {
          // 因为加密返回的是字符串 所以json必须手动序列化
          return throwError(
            new HttpErrorResponse({
              headers: err.headers,
              error: JSON.parse(err.error),
              status: err.status,
              statusText: err.statusText,
              url: err.url ?? undefined,
            })
          );
        }
        return throwError(err);
      })
    );
  }
}