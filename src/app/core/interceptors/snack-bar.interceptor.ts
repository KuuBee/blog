import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiType, AppHttpErrorResponse } from '../api/index';
import { AppSnackBarService } from '../../shared/services/app-snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SnackBarInterceptor implements HttpInterceptor {
  constructor(private _appSnackBarService: AppSnackBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<ApiType.SuccessResponse>> {
    return next.handle(request).pipe(
      catchError((err: AppHttpErrorResponse | HttpErrorResponse) => {
        const errorMsg =
          err?.error?.message?.toString() ?? err?.message ?? '未知错误！';
        this._appSnackBarService.error(errorMsg);
        return throwError(err);
      }),
      tap((val) => {
        if (val instanceof HttpResponse) {
          const responseBody = val.body as ApiType.SuccessResponse | string;
          if (
            typeof responseBody !== 'string' &&
            responseBody?.message !== 'success' &&
            responseBody?.message?.length
          )
            this._appSnackBarService.success(responseBody.message);
          if (!environment.production) console.log('请求结果:', val.body);
        }
        return of(val);
      })
    );
  }
}
