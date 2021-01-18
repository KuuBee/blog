import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseUrl = 'http://localhost:3000/api/blog';
    const requestUrl = request.url;
    let req: HttpRequest<unknown>;
    if (/^(https:\/\/)|(http:\/\/)/.test(requestUrl)) {
      req = request;
    } else {
      req = request.clone({
        url: `${baseUrl}${request.url}`,
      });
    }
    return next.handle(req);
  }
}
