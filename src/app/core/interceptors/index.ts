import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { UrlInterceptor } from './url.interceptor';
import { FormDataInterceptor } from './form-data.interceptor';
import { SnackBarInterceptor } from './snack-bar.interceptor';
import { EncryptInterceptor } from './encrypt.interceptor';
import { environment } from 'src/environments/environment';

export const httpInterceptorProviders = [
  // 这里的顺序是有讲究的
  // 请求时 无用                          返回时 显示 SnackBar
  { provide: HTTP_INTERCEPTORS, useClass: SnackBarInterceptor, multi: true },
  // 请求时 无用                          返回时 无用
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  // 请求时 添加 token                    返回时 无用
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  // 请求时 变更 url                      返回时 无用
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  // 请求时 加密全部请求数据                返回时 解密返回数据
  { provide: HTTP_INTERCEPTORS, useClass: EncryptInterceptor, multi: true },
  // 请求时 对请求数据进行 formData 封装     返回时 无用
  { provide: HTTP_INTERCEPTORS, useClass: FormDataInterceptor, multi: true },
];
