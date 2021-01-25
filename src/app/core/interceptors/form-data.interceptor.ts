import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUtilsService } from '@app/shared/services/app-utils.service';
import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

@Injectable()
export class FormDataInterceptor implements HttpInterceptor {
  constructor(private _appUtilsService: AppUtilsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const en = aes.encrypt('我我22xxcc', 'abc').toString();
    // const re = aes.decrypt(en, 'abc').toString(Utf8);
    // console.log('en', en);
    // console.log('re', re);

    if (request.method === ('POST' || 'PUT' || 'PATCH' || 'DELETE')) {
      // 有body的清除空
      const originBody = this._appUtilsService.removeNil(
        this._appUtilsService.omit(request.body, 'formDataType')
      );
      if (request.body.formDataType) {
        const body = new FormData();
        for (const key in originBody) {
          if (Object.prototype.hasOwnProperty.call(originBody, key)) {
            const element = originBody[key];
            console.log('element', element);

            body.append(key, element);
          }
        }
        const req: HttpRequest<any> = request.clone({
          body,
        });
        return next.handle(req);
      }
    }
    return next.handle(request);
  }
}
