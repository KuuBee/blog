/*
 * @Descripttion: 公共验证器
 * @Author: 杨湛杰
 * @Date: 2021-01-17 22:36:01
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-18 16:49:32
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
export function noJavaScript() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const NO_TAG_REG = /<.{0,30}>/;
    const NO_JAVASCRIP_REG = /javascript|js/i;
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
