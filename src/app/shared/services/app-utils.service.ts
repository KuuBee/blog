import { Injectable } from '@angular/core';

import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import scrollIntoView, { Options } from 'scroll-into-view-if-needed';

@Injectable({
  providedIn: 'root',
})
export class AppUtilsService {
  private _contentDom?: Element;

  get contentDom(): Element {
    if (!this._contentDom) {
      this._contentDom = document.querySelector(
        '.app-layout__content'
      ) as Element;
      if (!this._contentDom) {
        throw new Error('app-layout__content 类名不存在！请检查layout！');
      }
    }
    return this._contentDom;
  }
  /**
   * @description: 页面是否存在滚动条
   * @param target 默认是根元素(不是body 是 app__content)
   * @return true存在滚动条 false不存在滚动条
   */
  hasScroll(target = this.contentDom): boolean {
    const windowHeight = window.innerHeight;
    return (target?.scrollHeight ?? 0) > windowHeight;
  }
  omit<T extends { [key: string]: any }, K extends keyof T>(
    object: T | null | undefined,
    ...paths: K[]
  ) {
    return omit(object, paths);
  }
  removeNil(data: { [key: string]: any } | any[]) {
    return omitBy<any>(data, isNil);
  }

  scrollIntoView(
    node: Element,
    options: Pick<Options, 'scrollMode' | 'behavior' | 'block'> = {
      scrollMode: 'always',
      behavior: 'smooth',
      block: 'start',
    }
  ) {
    scrollIntoView(node, {
      ...options,
      boundary: this.contentDom,
    });
  }
}
