/*
 * @Descripttion: 配置服务
 * @Author: KuuBee
 * @Date: 2020-12-04 14:03:40
 * @LastEditors: KuuBee
 * @LastEditTime: 2020-12-04 14:29:31
 */
import { Injectable } from '@angular/core';
import { ThemeType } from './app-theme.service';

// 配置项
interface ConfigurationType {
  theme: ThemeType;
}
type configurationTypeKey = keyof ConfigurationType;

@Injectable({
  providedIn: 'root',
})
export class AppConfigurationService {
  constructor() {
    // 尝试从缓存内读取配置文件
    const storageConfiguration: string | undefined = localStorage.configuration;
    if (!storageConfiguration) {
      // 没有配置对象就插入默认对象
      localStorage.configuration = this.defaultConfiguration;
    }
    // 没有的话就用默认对象
    const formattConfiguration: string =
      storageConfiguration ?? this.defaultConfiguration;

    this._configuration = JSON.parse(formattConfiguration);
  }
  // 实际的配置对象
  private _configuration: ConfigurationType;
  // 默认配置对象
  private get defaultConfiguration() {
    const configuration: ConfigurationType = {
      theme: 'light',
    };
    return JSON.stringify(configuration);
  }
  // 对外的配置对象
  get configuration() {
    return this._configuration;
  }
  // 对外设置配置的方法
  setValue(
    key: configurationTypeKey,
    value: ConfigurationType[configurationTypeKey]
  ) {
    let res: boolean;
    try {
      this._configuration[key] = value;
      localStorage.configuration = JSON.stringify(this._configuration);
      res = true;
    } catch (error) {
      res = false;
      console.log(error);
    }
    return res;
  }
  // 对外读取配置的方法
  getValue(key: configurationTypeKey): ConfigurationType[configurationTypeKey] {
    return this._configuration[key];
  }
}
