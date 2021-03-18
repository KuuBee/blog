/*
 * @Descripttion: 公共dom操作抽离 降低dom操作消耗
 * @Author: KuuBee
 * @Date: 2021-01-30 17:11:45
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-01-30 17:23:17
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppDomService {
  constructor() {
    const body = document.body;
    window.onload = () => {
      this._bodyheight = body.clientHeight;
    };
    window.onresize = () => {   
      this._bodyheight = body.clientHeight;
    };
  }
  get bodyheight(): number | null {
    return this._bodyheight;
  }
  private _bodyheight: number | null = null;
}
