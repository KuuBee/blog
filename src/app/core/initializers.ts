/*
 * @Descripttion: 程序初始化
 * @Author: KuuBee
 * @Date: 2021-02-20 11:22:45
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-20 11:40:36
 */
import { APP_INITIALIZER } from '@angular/core';

import { StartupService } from './bootstrap/startup.service';
export function StartupServiceFactory(startupService: StartupService) {
  return () => {
    return startupService.load();
  };
}

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
