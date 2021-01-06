import { Injectable } from '@angular/core';
import scrollIntoView, { Options } from 'scroll-into-view-if-needed';

@Injectable({
  providedIn: 'root',
})
export class AppScrollService {
  constructor() {}
  private rootScrollDom?: Element;
  scrollIntoView(
    node: Element,
    options: Pick<Options, 'scrollMode' | 'behavior' | 'block'> = {
      scrollMode: 'always',
      behavior: 'smooth',
      block: 'start',
    }
  ) {
    if (!this.rootScrollDom) {
      // 这个dom是肯定存在的 如果你这里报了错误 8成是在dom初始化之前就掉用了这个方法
      this.rootScrollDom = document.getElementsByClassName('app__content')[0];
    }
    scrollIntoView(node, {
      ...options,
      boundary: this.rootScrollDom,
    });
  }
}
