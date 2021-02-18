import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestUrl = request.url;
    let req: HttpRequest<unknown>;
    if (/^(https:\/\/)|(http:\/\/)/.test(requestUrl)) {
      req = request;
    } else {
      req = request.clone({
        url: `${environment.baseUrl}${request.url}`,
        // url: `https://autocode.icu/api/blog${request.url}`,
      });
    }
    return next.handle(req);
  }
}
