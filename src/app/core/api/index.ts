import { HttpErrorResponse } from '@angular/common/http';

/*
 * @Descripttion: 包含了基本的一些接口类型
 * @Author: 杨湛杰
 * @Date: 2021-01-17 22:09:09
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-17 22:09:09
 */
export namespace ApiType {
  export interface SuccessResponse<T = any> {
    data: T;
    message: string;
    code: number;
  }
  export interface ErrorResponse<T = null> extends HttpErrorResponse {
    error: _ErrorType<T>;
  }
  interface _ErrorType<T> {
    data: T;
    message: string | string[];
    path: string;
    statusCode: number;
  }
}
