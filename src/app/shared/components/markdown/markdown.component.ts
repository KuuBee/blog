import {
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  OnDestroy,
  StaticProvider,
  ViewChild,
} from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleApiType } from '@app/core/api/article-api.service';
import { SearchApiType } from '@app/core/api/search-api.service';
import { AppMarkdownService } from '@app/shared/services/app-markdown.service';
import { MarkdownComponent } from 'ngx-markdown';
import { XssService } from '@app/shared/services/xss.service';
import { Router } from '@angular/router';
import { AppUtilsService } from '@app/shared/services/app-utils.service';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { fromEvent, Subscription } from 'rxjs';

enum ChangeType {
  previous,
  next,
}

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})
export class AppMarkdownComponent implements OnInit, OnDestroy {
  constructor(
    private _snackBar: MatSnackBar,
    private _markdown: AppMarkdownService,
    private _xss: XssService,
    private _router: Router,
    private _utils: AppUtilsService,
    private _overlay: Overlay,
    private _injector: Injector
  ) {}
  // 是否需要收缩
  @Input() isShrink: boolean = false;
  // 远程数据地址 远程数据优先级更高
  @Input() src?: string;
  // 文章id
  @Input() articleId!: number | string;
  // 文章标题
  @Input() articleTitle?: string = '';
  // tagid列表
  @Input() tagArr?: SearchApiType.Response.IndexData[] = [];
  // 分类信息
  @Input() classification?: ArticleApiType.Response.Classification;
  // 创建日期
  @Input() date?: string;

  @Input('loading') outerLoading = false;

  @Input() pageArr: [number | null, number | null] = [null, null];
  // 本地数据内容
  @Input()
  get content() {
    return this._content;
  }
  set content(val: string) {
    this._content = this._xss.filterXSS(val);
  }

  @Output() load = new EventEmitter<MarkdownComponent>();
  @ViewChild('markdownRoot') markdownRoot?: ElementRef;

  loading = true;
  private _content: string = '';
  private _imageClickSub: Subscription[] = [];

  get markdownContent() {
    if (this.src) return '';
    return this.content;
  }
  ngOnInit(): void {
    if (!this.src) {
      this.loading = false;
      if (this.markdownContent) {
        // 内容md不会出发onload函数
        this.addImageOpenerListener();
      }
    }
  }
  ngOnDestroy() {
    this._imageClickSub.forEach((item) => item.unsubscribe());
  }
  // 只有远程加载的md才会触发onload
  onLoad(markdownComponent: MarkdownComponent) {
    this.addImageOpenerListener();
    this.loading = false;
    if (this.isShrink) return;
    // 下面一行有个巨坑
    // 先说逻辑 这里其实就是想获取 `markdown` 的dom，然后基于这个在进行下一步的筛选
    // 因为有路由动画 375ms，就导致了上一页的 `markdown` 还未消失，这一页的 markdown 就在出来了
    // 就导致获取2个 markdown，但因为之前都是在一页刷新，就从未发现这个问题
    // =。= 现在发现后就采用从组件 MarkdownComponent 实例上取已经存好的 dom 了
    // const markdownDom = document.getElementsByTagName('markdown')[0];

    this._markdown.markdownDom$.next(markdownComponent.element.nativeElement);
    this.load.emit(markdownComponent);
  }
  onError(err: any) {
    throw new Error(err);
  }
  changePage(type: 'previous' | 'next') {
    const page = type === 'previous' ? this.pageArr[0] : this.pageArr[1];
    if (page?.toString()) {
      this._utils.contentDom?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this._router.navigateByUrl(`article/${page}`);
    } else {
      this._snackBar.open(
        `你已经达到世界的尽头了${type === 'next' ? '(○´･д･)ﾉ' : 'ヽ(･д･`●)'}`,
        '关闭'
      );
    }
  }
  trackById(_index: number, item: SearchApiType.Response.IndexData) {
    return item.id;
  }
  /**
   * @description: 给图片增加点击事件监听监听
   */
  addImageOpenerListener() {
    setTimeout(() => {
      const imageList: HTMLImageElement[] = Array.from(
        this.markdownRoot?.nativeElement.querySelectorAll('img') ?? []
      );
      if (!imageList.length) return;
      this._imageClickSub = imageList.map((item) => {
        return fromEvent(item, 'click').subscribe(({ target }) => {
          const src = (target as HTMLImageElement | null)?.src;
          if (src) this.openImagePreview(src);
        });
      });
    });
  }
  /**
   * @description: 打开图片预览
   * @param {string} src
   */
  openImagePreview(src: string) {
    const config = new OverlayConfig({
      panelClass: 'xxx',
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global(),
    });
    const overlayRef = this._overlay.create(config);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    overlayRef.attach(
      new ComponentPortal(
        ImagePreviewComponent,
        null,
        this._createImagePreviewInjector([
          { provide: 'SRC', useValue: src },
          {
            provide: 'ON_CLOSE',
            useValue: () => {
              overlayRef.dispose();
            },
          },
        ])
      )
    );
  }
  /**
   * @description: 给组件注入数据
   * @param {StaticProvider[]} providers
   */
  private _createImagePreviewInjector(providers: StaticProvider[]): Injector {
    return Injector.create({
      parent: this._injector,
      providers,
    });
  }
}
