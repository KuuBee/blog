/*
 * @Descripttion: 主题服务
 * @Author: KuuBee
 * @Date: 2020-12-04 13:42:33
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-23 11:34:46
 */
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { AppConfigurationService } from './app-configuration.service';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  constructor(
    // 全局配置对象
    private appConfiguration: AppConfigurationService
  ) {
    // 初始化主题尝试从配置文件内读取
    // 如果没有就设置
    this._ThemeType = this.appConfiguration.getValue('theme') ?? 'light';
    this.theme$ = new BehaviorSubject(this._ThemeType);
  }
  theme$: BehaviorSubject<ThemeType>;
  // 内部
  private _ThemeType: ThemeType;
  // 对外
  get ThemeType() {
    return this._ThemeType;
  }
  // 主题置反
  changeTheme() {
    let message: string;
    const bodyClassName = document.body.className;
    // 切换主题的时候 修改主题类名
    if (this._ThemeType === 'dark') {
      this._ThemeType = 'light';
      message = '明亮';
      if (bodyClassName.includes('dark-theme')) {
        document.body.className = bodyClassName.replace(
          'dark-theme',
          'light-theme'
        );
      } else {
        document.body.className += ' light-theme';
      }
    } else {
      this._ThemeType = 'dark';
      message = '♂Dark♂';
      if (bodyClassName.includes('light-theme')) {
        document.body.className = bodyClassName.replace(
          'light-theme',
          'dark-theme'
        );
      } else {
        document.body.className += ' dark-theme';
      }
    }
    this.theme$.next(this._ThemeType);
    this.appConfiguration.setValue('theme', this._ThemeType);
    // 暂时不开启提示
    // this.snackBar.open(`切换至${message}模式`, '关闭', {
    //   duration: 1500,
    // });
  }
}
