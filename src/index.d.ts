/*
 * @Descripttion:
 * @Author: 杨湛杰
 * @Date: 2021-01-07 11:46:33
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-07 13:49:02
 */
interface BrowserInfo {
  fullVersion: string;
  name: string;
  os: string;
  version: string;
}
declare module 'browser-info' {
  export default function browserInfo(): BrowserInfo;
}
