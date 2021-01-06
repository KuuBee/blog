import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor() {}
  readonly userName = 'KuuBee';
  readonly motto = '相信心就是你的魔法 耶～';
  readonly city = 'Nanjing';
  readonly country = 'China';
}
