/*
 * @Descripttion: 包含了基本的一些接口类型
 * @Author: KuuBee
 * @Date: 2021-01-17 22:09:09
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-01-17 22:09:09
 */

import { HttpErrorResponse } from '@angular/common/http';
// api 用的公共类型
export namespace ApiType {
  export interface SuccessResponse<T = any> {
    data: T;
    message: string;
    code: number;
  }
  export interface ErrorResponse<T = null> extends AppHttpErrorResponse {}
  // interface _ErrorType<T> {
  //   data: T;
  //   message: string | string[];
  //   path: string;
  //   statusCode: number;
  // }
  export interface PaginationParameter {
    page: string | number;
    pageSize: string | number;
  }
  export interface PaginationResponse<T> {
    data: T[];
    pagination: Pagination;
  }
  export interface Pagination {
    count: number;
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
    isLast: boolean;
  }
}

interface ErrorType<T = null> {
  data: T;
  message: string | string[];
  path: string;
  statusCode: number;
}
/* 
  具有交合的基础类型
*/
export interface CommentBase {
  commentId: number;
  content: string;
  os: string;
  browser: string;
  name: string;
  avatar: string;
  level: number;
  link: string;
  createdAt: string;
}
export class ApiBase {
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  protected _baseUrl: string;
}

export class AppHttpErrorResponse extends HttpErrorResponse {
  constructor(opt: ErrorType) {
    super({
      error: opt,
    });
  }
}
