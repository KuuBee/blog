import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { UrlInterceptor } from './url.interceptor';
import { FormDataInterceptor } from './form-data.interceptor';
import { SnackBarInterceptor } from './snack-bar.interceptor';
import { EncryptInterceptor } from './encrypt.interceptor';

export const httpInterceptorProviders = [
  // 这里的顺序是有讲究的
  { provide: HTTP_INTERCEPTORS, useClass: SnackBarInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: EncryptInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: FormDataInterceptor, multi: true },
];
