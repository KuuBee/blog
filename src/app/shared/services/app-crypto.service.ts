/*
 * @Descripttion: 加密服务
 * @Author: 杨湛杰
 * @Date: 2021-01-24 22:44:42
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-25 13:55:54
 */
import { Injectable } from '@angular/core';
import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

@Injectable({
  providedIn: 'root',
})
export class AppCryptoService {
  constructor() {}
  // 生成 密钥 24位 字母+数字
  generateKey(): string {
    let keyArr = [];
    for (let index = 0; index < 3; index++) {
      keyArr.push(Math.random().toString(36).substring(2, 10));
    }
    return keyArr.join('');
  }
  aesEncrypt(data: string, key: string) {
    const aesRes = aes.encrypt(data, key);
    return aesRes.toString();
  }
  aesDecrypt(code: string, key: string) {
    const aesDecryptRes = aes.decrypt(code, key);
    return aesDecryptRes.toString(Utf8);
  }
}
