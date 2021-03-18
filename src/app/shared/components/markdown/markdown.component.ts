import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleApiType } from '@app/core/api/article-api.service';
import { SearchApiType } from '@app/core/api/search-api.service';
import { AppMarkdownService } from '@app/shared/services/app-markdown.service';
import { MarkdownComponent } from 'ngx-markdown';

enum ChangeType {
  previous,
  next,
}

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})
export class AppMarkdownComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private appMarkdownService: AppMarkdownService
  ) {}
  // 是否需要收缩
  @Input() isShrink: boolean = false;
  // 远程数据地址 远程数据优先级更高
  @Input() src?: string;
  // 本地数据内容
  @Input() content?: string;
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

  @Output() load = new EventEmitter<MarkdownComponent>();

  loading = true;

  get markdownContent() {
    if (this.src) return '';
    return this.content;
  }
  ngOnInit(): void {
    if (!this.src) {
      this.loading = false;
    }
  }
  onLoad(markdownComponent: MarkdownComponent) {
    this.loading = false;
    if (this.isShrink) return;
    // 下面一行有个巨坑
    // 先说逻辑 这里其实就是想获取 `markdown` 的dom，然后基于这个在进行下一步的筛选
    // 因为有路由动画 375ms，就导致了上一页的 `markdown` 还未消失，这一页的 markdown 就在出来了
    // 就导致获取2个 markdown，但因为之前都是在一页刷新，就从未发现这个问题
    // =。= 现在发现后就采用从组件 MarkdownComponent 实例上取已经存好的 dom 了
    // const markdownDom = document.getElementsByTagName('markdown')[0];
    this.appMarkdownService.markdownDom$.next(
      markdownComponent.element.nativeElement
    );
    this.load.emit(markdownComponent);
  }
  onError(err: any) {
    throw new Error(err)
  }
  changePage(type: 'previous' | 'next') {
    this.snackBar.open(
      `你已经达到世界的尽头了${type === 'next' ? '(○´･д･)ﾉ' : 'ヽ(･д･`●)'}`,
      '关闭'
    );
  }
  trackById(index: number, item: SearchApiType.Response.IndexData) {
    return item.id;
  }
}
