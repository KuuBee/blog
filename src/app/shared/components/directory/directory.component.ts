import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatTreeNestedDataSource,
  NestedTreeControl,
} from '@app/material.module';
import {
  AppMarkdownService,
  DirectoryType,
} from '@app/shared/services/app-markdown.service';
import { AppScrollService } from '@app/shared/services/app-scroll.service';
import { combineLatest, fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import scrollIntoView from 'scroll-into-view-if-needed';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit, OnDestroy {
  constructor(
    private _appMarkdownService: AppMarkdownService,
    private _appScrollService: AppScrollService
  ) {}
  renderData: DirectoryType[] = [];
  dataSource = new MatTreeNestedDataSource<DirectoryType>();
  treeControl = new NestedTreeControl<DirectoryType>((node) => node.children);
  scrollSubscription?: Subscription;
  previous?: DirectoryType;
  flatTree: DirectoryType[] = [];
  cacheFlatTree: string = '';
  loading = true;

  ngOnInit(): void {
    this._appMarkdownService.markdownDirectoryRenderData$.subscribe((res) => {
      this.renderData = res;
      this.dataSource.data = res;
      this.treeControl.dataNodes = res;
      this.loading = false;
    });

    this.watchScroll();
  }
  ngOnDestroy() {
    console.log('DirectoryComponent Destroy');
    this.scrollSubscription?.unsubscribe();
  }
  // 判断是否为根叶子
  hasChild = (_: number, node: DirectoryType) =>
    !!node.children && node.children.length > 0;

  watchScroll() {
    let newContext: Element[][];
    let laysIndex: number | null = null;
    let targetContext: DirectoryType | null = null;
    const ROOT_DOM: Element = document.getElementsByClassName(
      'app__content'
    )[0];
    const ROOT_DOM_TOP: number = ROOT_DOM.getClientRects()[0].top;
    this.scrollSubscription = combineLatest([
      this._appMarkdownService.markdownHeadDom$,
      this._appMarkdownService.markdownDirectoryRenderData$,
      fromEvent(ROOT_DOM, 'scroll'),
    ]).subscribe((res) => {
      this.flatTree = [];
      const [headDom, renderData] = res;
      let targetDom: HTMLHeadElement | null = null;
      let targetIndex: number = NaN;
      for (const element of headDom) {
        const elementClientRects = element.getClientRects();
        const elementBottom = elementClientRects[0].top;
        const currentIndex = headDom.indexOf(element);
        if (elementBottom < ROOT_DOM_TOP) {
          if (currentIndex === headDom.length - 1) {
            targetDom = element;
            targetIndex = currentIndex;
            break;
          } else {
            const nextElementBottom = headDom[
              currentIndex + 1
            ].getClientRects()[0].top;
            if (nextElementBottom > ROOT_DOM_TOP) {
              targetDom = element;
              targetIndex = currentIndex;
              break;
            }
          }
        } else {
          targetDom = element;
          targetIndex = currentIndex;
          break;
        }
      }
      if (!newContext?.length) {
        newContext = this._appMarkdownService.getNewContext(headDom, 'H1');
      }
      const range = newContext.map((item, index) => {
        if (!index) {
          return item.length;
        } else {
          let temporaryLength = 0;
          newContext.slice(0, index + 1).forEach((item) => {
            temporaryLength += item.length;
          });
          return temporaryLength;
        }
      });
      // 用于筛选是第几层的
      // 避免无意义的遍历
      for (const index of range) {
        if (targetIndex < index) {
          laysIndex = range.indexOf(index);
          break;
        }
      }
      if (laysIndex?.toString()) {
        targetContext = this.renderData[laysIndex];
      }
      // 如果目标上下文和目标 dom 都存在到话就进行筛选
      if (targetContext && targetDom) {
        this.expand(targetContext, targetDom);
      }
      const stringifyFlatTree = JSON.stringify(this.flatTree);
      // 用于对比当前到项是否为展开项 避免重复展开收缩
      if (this.cacheFlatTree.length) {
        if (this.cacheFlatTree !== stringifyFlatTree) {
          this.treeControl.collapseAll();
          this.flatTree.forEach((item) => {
            this.treeControl.expand(item);
          });
          this.cacheFlatTree = stringifyFlatTree;
        }
      } else {
        this.flatTree.forEach((item) => {
          this.treeControl.expand(item);
        });
        this.cacheFlatTree = stringifyFlatTree;
      }
    });
  }
  // 用于筛选展开的对象
  // FIXME 这个函数名字不好 有空改一下
  expand(context: DirectoryType, targetDom: Element): DirectoryType | null {
    if (context.element === targetDom) {
      // 用 unshift 挤到前面
      this.flatTree.unshift(context);
      return context;
    } else {
      if (context.children) {
        const res = context.children
          .map((item) => this.expand(item, targetDom))
          .filter((item) => item)?.[0];
        if (res) {
          this.flatTree.unshift(context);
        }
        return res;
      } else {
        return null;
      }
    }
  }

  // 滚动至顶
  scrollToTop(node: Element) {
    this._appScrollService.scrollIntoView(node);
  }
}
