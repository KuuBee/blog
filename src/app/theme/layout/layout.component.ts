import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { searchBarBlurAnimation } from '@app/shared/animation/app-search.animation';
import { AppSearchService } from '@app/shared/services/app-search.service';
import { AppThemeService } from '@app/shared/services/app-theme.service';
import { AppUtilsService } from '@app/shared/services/app-utils.service';
import { UserInfoService } from '@app/shared/services/user-info.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CursorService } from '@app/shared/services/cursor.service';

export enum LayoutComponents {
  USER_CARD,
  TAG_CARD,
  RECENT_CARD,
  DIRECTORY,
}
export interface ToolbarInfoType {
  icon?: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [searchBarBlurAnimation],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private _appSearchService: AppSearchService,
    private _appThemeService: AppThemeService,
    private _mediaObserver: MediaObserver,
    private _userInfo: UserInfoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _utils: AppUtilsService,
    private _cursor: CursorService
  ) {}
  @ViewChild('content')
  private _content?: ElementRef;

  layoutComponents: number[] = [];
  hasUserCard = false;
  hasDirectory = false;
  hasRecentCard = false;
  hasTagCard = false;
  isXs = false;
  mediaSub?: Subscription;
  readonly toolbarInfo: ToolbarInfoType[] = [
    {
      icon: 'home',
      text: '主页',
      link: '/home',
    },
    {
      icon: 'class',
      text: '分类',
      link: '/classification',
    },
    {
      icon: 'tag',
      text: '标签',
      link: '/tag',
    },
    {
      icon: 'archive',
      text: '归档',
      link: '/archive',
    },
    {
      icon: 'link',
      text: '友链',
      link: '/friend-link',
    },
    {
      icon: 'info',
      text: '关于',
      link: '/about',
    },
  ];

  get isDark() {
    return this._appThemeService.ThemeType === 'dark';
  }

  get isShowSearch(): boolean {
    return this._appSearchService.isShow;
  }

  get name() {
    return this._userInfo.ownerName;
  }

  ngOnInit() {

    this.initRoute();
    this.initMedia();

    // 初始化的时候给body添加主题类名
    if (this.isDark) {
      document.body.className += ' dark-theme';
    } else {
      document.body.className += ' light-theme';
    }
    // 改变title
    document.title = `${this.name}的猫窝`;

    const rootDom = document.getElementById('root') as HTMLElement;
    const rootLoading = document.getElementById('root-loading') as HTMLElement;
    const rootLoadingParent = rootLoading.parentNode as Node;
    // 清除加载动画
    if (environment.production) {
      rootDom.style.display = 'inline';
      rootLoadingParent.removeChild(rootLoading);
    } else {
      rootDom.style.display = 'inline';
      rootLoadingParent.removeChild(rootLoading);
    }
  }
  ngAfterViewInit() {
    this._utils.contentDom$.next(this._content?.nativeElement);
  }
  ngOnDestroy() {
    this.mediaSub?.unsubscribe();
  }

  initRoute() {
    // 初始化的时候手动读取一次值
    this._route.children[0].data.subscribe((res) => {
      this.layoutComponents = res?.layoutComponents ?? [];
      this.changeComponents();
    });
    this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this._route.children[0].data.subscribe((data) => {
          this.layoutComponents = data?.layoutComponents ?? [];
          this.changeComponents();
        });
      });
  }

  // 初始化媒体监听
  initMedia() {
    this.isXs = this._mediaObserver.isActive('xs');
    // 改变指针的服务只在非移动端开启
    if (!this.isXs) this._cursor.init();
    this.mediaSub = this._mediaObserver.asObservable().subscribe(() => {
      // 监听断点改变
      this.isXs = this._mediaObserver.isActive('xs');
    });
  }

  changeComponents() {
    const hasIncludes = (data: LayoutComponents): boolean =>
      this.layoutComponents.includes(data);
    this.hasUserCard = hasIncludes(LayoutComponents.USER_CARD);
    this.hasDirectory = hasIncludes(LayoutComponents.DIRECTORY);
    this.hasTagCard = hasIncludes(LayoutComponents.TAG_CARD);
    this.hasRecentCard = hasIncludes(LayoutComponents.RECENT_CARD);
  }
}
