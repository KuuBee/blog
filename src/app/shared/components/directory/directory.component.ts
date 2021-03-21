import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import {
  MatTreeNestedDataSource,
  NestedTreeControl,
} from '@app/material.module';
import {
  AppMarkdownService,
  DirectoryType,
} from '@app/shared/services/app-markdown.service';
import { AppUtilsService } from '@app/shared/services/app-utils.service';
import { combineLatest, fromEvent, of, Subscription } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit, OnDestroy {
  constructor(
    private _markdownService: AppMarkdownService,
    private _utils: AppUtilsService,
    private _router: Router
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
    this._markdownService.markdownDirectoryRenderData$.subscribe((res) => {
      this.renderData = res;
      this.dataSource.data = res;
      this.treeControl.dataNodes = res;
      this.loading = false;
    });
    this.watchScroll();
    // 需要监听路由改变
    // 如果改变 需要先取消订阅 然后再次订阅
    this._router.events.subscribe((res) => {
      if (res instanceof NavigationStart)
        this.scrollSubscription?.unsubscribe();
      if (res instanceof NavigationEnd) {
        this.watchScroll();
      }
    });
  }
  ngOnDestroy() {
    this.scrollSubscription?.unsubscribe();
  }
  // 判断是否为根叶子
  hasChild = (_: number, node: DirectoryType) =>
    !!node.children && node.children.length > 0;

  watchScroll() {
    let newContext: Element[][];
    let laysIndex: number | null = null;
    let targetContext: DirectoryType | null = null;
    let rootDomTop: number;

    this.scrollSubscription = this._utils.contentDom$
      .pipe(
        concatMap((val) => {
          if (!val) return of(null);
          // 这里获取滚动页面的高度
          // 加 10 的目的是为了增加一点额外的高度
          // 让筛选的 dom 不需要必须超出视图才能检测出来
          rootDomTop = val.getClientRects()[0].top + 10;
          return combineLatest([
            this._markdownService.markdownHeadDom$,
            this._markdownService.markdownDirectoryRenderData$,
            fromEvent(val, 'scroll'),
          ]);
        })
      )
      .subscribe((res) => {
        if (!res) return;
        this.flatTree = [];
        const [headDom] = res;
        let targetDom: HTMLHeadElement | null = null;
        let targetIndex: number = NaN;
        for (const element of headDom) {
          const elementClientRects = element.getClientRects();
          const elementBottom = elementClientRects[0].top;
          const currentIndex = headDom.indexOf(element);

          if (elementBottom < rootDomTop) {
            if (currentIndex === headDom.length - 1) {
              targetDom = element;
              targetIndex = currentIndex;
              break;
            } else {
              const nextElementBottom = headDom[
                currentIndex + 1
              ].getClientRects()[0].top;
              if (nextElementBottom > rootDomTop) {
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
          newContext = this._markdownService.getNewContext(headDom, 'H1');
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
    this._utils.scrollIntoView(node);
  }
}
