/*
 * @Descripttion: 包含了基本的一些接口类型
 * @Author: 杨湛杰
 * @Date: 2021-01-17 22:09:09
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-17 22:09:09
 */
export namespace ApiType {
  export interface SuccessResponse<T> {
    data: T;
    message: string;
    code: number;
  }
}
