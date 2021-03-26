import { Injectable } from '@angular/core';
import { omit, omitBy, isNil } from 'lodash-es';

import scrollIntoView, { Options } from 'scroll-into-view-if-needed';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppUtilsService {
  constructor() {
    this.contentDom$.subscribe((ele) => {
      if (ele) this._contentDom = ele;
    });
  }
  private _contentDom?: Element;
  contentDom$ = new BehaviorSubject<null | Element>(null);

  get contentDom(): Element {
    if (!this._contentDom) {
      this._contentDom = document.querySelector(
        '.app-layout__content'
      ) as Element;
      if (!this._contentDom) {
        setTimeout(() => {
          this.contentDom;
        }, 10);
        // throw new Error('app-layout__content 类名不存在！请检查layout！');
      }
    }
    return this._contentDom;
  }
  // get contentDom$() {
  //   if (!this._contentDom$) this._contentDom$ = new BehaviorSubject(null);
  //   return this._contentDom$;
  // }
  /**
   * @description: 页面是否存在滚动条
   * @param target 默认是根元素(不是body 是 app-layout__content)
   * @return true存在滚动条 false不存在滚动条
   */
  async hasScroll(target?: Element): Promise<boolean> {
    if (!target) {
      target = (await this.contentDom$.toPromise()) as Element;
    }
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
