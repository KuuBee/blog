/*
 * @Descripttion: 主题服务
 * @Author: 杨湛杰
 * @Date: 2020-12-04 13:42:33
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-04 14:53:07
 */
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfigurationService } from './app-configuration.service';

export type themeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  constructor(
    private snackBar: MatSnackBar,
    // 全局配置对象
    private appConfiguration: AppConfigurationService
  ) {
    // 初始化主题尝试从配置文件内读取
    // 如果没有就设置
    this._themeType = this.appConfiguration.getValue('theme') ?? 'light';
  }
  // 内部
  private _themeType: themeType;
  // 对外
  get themeType() {
    return this._themeType;
  }
  // 主题置反
  changeTheme() {
    let message: string;
    const bodyClassName = document.body.className;
    // 切换主题的时候 修改主题类名
    if (this._themeType === 'dark') {
      this._themeType = 'light';
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
      this._themeType = 'dark';
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
    this.appConfiguration.setValue('theme', this._themeType);
    console.log(document.body.className);
    // document.body.className = 'a';
    this.snackBar.open(`切换至${message}模式`, '关闭', {
      duration: 1500,
    });
  }
}
