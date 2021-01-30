/*
 * @Descripttion: 加密服务
 * @Author: 杨湛杰
 * @Date: 2021-01-24 22:44:42
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-28 13:57:24
 */
import { Injectable } from '@angular/core';
import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import Hex from 'crypto-js/enc-hex';
import Utf16 from 'crypto-js/enc-utf16';
import CryptoJS from 'crypto-js';
import jsencrypt, { JSEncrypt } from 'jsencrypt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppCryptoService {
  constructor() {
    // console.log('this.generateKey', this.generateKey(16));
    // const _key = this.generateKey();
    // const _iv = this.generateKey(16);
    // console.log('_key:', _key);
    // console.log('_iv:', _iv);
    // const key = Utf8.parse(_key);
    // const iv = Utf8.parse(_iv);
    // const data = '122333';
    // const res = aes.encrypt(data, key, {
    //   iv,
    // });
    // // 这里直接toString 默认是base64编码
    // console.log('密文', res.toString());
    // const de = aes.decrypt(res.toString(), key, {
    //   iv,
    // });
    // console.log('明文', de.toString(Utf8));
  }

  private get _publicKeyStr() {
    if (environment.production) {
      // 生产用
      return '';
    } else {
      // 开发用
      return `
      -----BEGIN PUBLIC KEY-----
      MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdzfxbhM2jUC1BPfCwjyCx1tca
      +NLayo5AbygcxDgJ/XOLqb/ejMRyjvmlK81aS0Tygx4zCLP+35WciqZAyu1V+RYv
      pmLIL+1D5kMpsuytSHY067hEtqXg2Impj0vChJdk9hstXG5MlLcUAf7aTOfDQzpR
      xEyOj83TeoMJtmn54wIDAQAB
      -----END PUBLIC KEY-----
      `;
    }
  }

  /**
   * @description: 生成 16 | 24 | 32 字节字母数字随机密钥
   * @return {string} 密钥
   */
  generateKey(bytes: 16 | 24 | 32 = 32): string {
    let keyArr = [];
    for (let index = 0; index < bytes / 8; index++) {
      keyArr.push(Math.random().toString(36).substring(2, 10));
    }
    return keyArr.join('');
  }

  /**
   * @description: AES 加密
   * @param {string} data 需要加密的文明
   * @param {string} key 加密用密钥
   * @return {string} 密文
   */
  aesEncrypt(data: string, key: string, iv: string): string {
    const _iv = Utf8.parse(iv);
    const _key = Utf8.parse(key);
    const aesRes = aes.encrypt(data, _key, {
      iv: _iv,
    });
    return aesRes.toString();
  }

  /**
   * @description: AES 解密
   * @param {string} code 密文
   * @param {string} key 加密时的key
   * @return {string} 明文
   */
  aesDecrypt(code: string, key: string, iv: string): string {
    const _iv = Utf8.parse(iv);
    const _key = Utf8.parse(key);
    const aesDecryptRes = aes.decrypt(code, _key, { iv: _iv });
    if (aesDecryptRes.sigBytes < 0) {
      throw new Error('aesDecryptRes 解密失败');
    }
    return aesDecryptRes.toString(Utf8);
  }

  /**
   * @description: RSA 加密
   * @param {string} message 需要加密的明文
   * @return {string} 密文
   */
  rsaEncrypt(message: string): string {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(this._publicKeyStr);
    return encrypt.encrypt(message);
  }
}
