import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

export interface DirectoryType {
  title: string;
  id: string;
  element: HTMLElement;
  children?: DirectoryType[];
}
@Injectable({
  providedIn: 'root',
})
export class AppMarkdownService {
  constructor() {}

  private _tagList: string[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  markdownDom$: Subject<Element> = new Subject();
  markdownHeadDom$: Observable<HTMLHeadElement[]> = this.markdownDom$.pipe(
    concatMap((dom) => {
      const children = Array.from(dom.children);
      const head = children.filter((item) =>
        this._tagList.includes(item.tagName.toLowerCase())
      ) as HTMLHeadElement[]; 
      return of(head);
    })
  );
  // 目录渲染数据
  markdownDirectoryRenderData$: Observable<
    DirectoryType[]
  > = this.markdownHeadDom$.pipe(
    concatMap((dom) => {
      const newContext = this.getNewContext(dom, 'H1');
      const renderData: DirectoryType[] = newContext.map<DirectoryType>(
        (item, index) =>
          this.sort(item, '', 1, (index + 1).toString()) as DirectoryType
      );
      return of(renderData);
    })
  );
  // 排序
  sort(
    context: HTMLElement[],
    parentId: string,
    level: number = 1,
    index: string
  ): DirectoryType {
    const currentElement = context[0];
    const title = currentElement.textContent ?? '';
    const id = parentId ? `${parentId}.${index}` : index;
    if (context.length > 1) {
      let nextLevel = level + 1;
      let newContext = this.getNewContext(context, `H${nextLevel}`);
      if (newContext.length === 0) {
        // 如果能走到这里就代表了
        // 出现了跨层结构
        // 即 [h1,h2,h5]
        // 所以下面在原本的基础上再更新增加索引
        // 查找元素
        for (const iterator of this._tagList) {
          nextLevel += 1;
          newContext = this.getNewContext(context, `H${nextLevel}`);
          if (newContext.length !== 0) break;
        }
      }
      if (newContext.length > 1) {
        return {
          title,
          id,
          element: currentElement,
          children: newContext.map((item, subIndex) =>
            this.sort(item, id, nextLevel, (subIndex + 1).toString())
          ),
        };
      } else {
        return {
          title,
          id,
          element: currentElement,
          children: [this.sort(newContext[0], id, nextLevel, '1')],
        };
      }
    } else {
      return {
        title,
        id,
        element: currentElement,
      };
    }
  }

  // 切片
  getNewContext(context: HTMLElement[], tagName: string): HTMLElement[][] {
    const newContext: HTMLElement[][] = [];
    const newContextIndex: number[] = [];
    context.forEach((item, index) => {
      if (item.tagName === tagName) {
        newContextIndex.push(index);
      }
    });

    newContextIndex.forEach((item, index) => {
      if (index !== newContextIndex.length - 1) {
        newContext.push(context.slice(item, newContextIndex[index + 1]));
      } else {
        newContext.push(context.slice(item, context.length));
      }
    });
    return newContext;
  }
}
