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

@Injectable()
export class SnackBarInterceptor implements HttpInterceptor {
  constructor(private _appSnackBarService: AppSnackBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<ApiType.SuccessResponse>> {
    return next.handle(request).pipe(
      catchError((err: AppHttpErrorResponse | HttpErrorResponse) => {
        console.log('err::', err);

        // FIXME
        // emmmm 下面这一段意义不明 我也记不得为啥要这么写了
        // if (err instanceof AppHttpErrorResponse) {
        //   let errorMsg = err?.error?.message?.toString() ?? '未知错误！';
        //   this._appSnackBarService.error(errorMsg);
        //   return throwError(err);
        // }
        // if (err instanceof HttpErrorResponse) {
        //   this._appSnackBarService.error(err.message);
        //   return throwError(err);
        // }
        // this._appSnackBarService.error('未知错误！');
        // return throwError(err);

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
        }
        return of(val);
      })
    );
  }
}
