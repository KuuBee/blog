/*
 * @Descripttion: 公共验证器
 * @Author: KuuBee
 * @Date: 2021-01-17 22:36:01
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-18 09:40:29
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
export const NO_JS_ERROR_MESSAGE = '拜托请不要写一些奇奇怪怪的东西';
export const HTTPS_ONLY_MESSAGE = 'httpsOnly';
export function noJavaScript() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const NO_TAG_REG = /<.{0,30}>/;
    const NO_JAVASCRIP_REG = /javascript|script/i;
    if (
      NO_TAG_REG.test(control.value) ||
      NO_JAVASCRIP_REG.test(control.value)
      // true
    ) {
      return {
        noJavaScript: true,
      };
    } else {
      return null;
    }
  };
}
export function httpsOnly() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const HTTPS_ONLY_REG = /^https:\/\//;
    if (
      !HTTPS_ONLY_REG.test(control.value)
      // true
    ) {
      return {
        httpsOnly: true,
      };
    } else {
      return null;
    }
  };
}
