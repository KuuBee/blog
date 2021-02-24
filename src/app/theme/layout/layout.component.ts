import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {searchBarBlurAnimation} from '@app/shared/animation/app-search.animation';
import {AppDialogService} from '@app/shared/services/app-dialog.service';
import {AppSearchService} from '@app/shared/services/app-search.service';
import {AppThemeService} from '@app/shared/services/app-theme.service';
import {UserInfoService} from '@app/shared/services/user-info.service';
import {concatMap, delay, filter, take} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

export enum LayoutComponents {
  USER_CARD,
  TAG_CARD,
  RECENT_CARD,
  DIRECTORY,
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [searchBarBlurAnimation],
})
export class LayoutComponent implements OnInit {
  constructor(
    private _appThemeService: AppThemeService,
    private _appSearchService: AppSearchService,
    private _userInfo: UserInfoService,
    private _appDialogService: AppDialogService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  layoutComponents: number[] = [];
  hasUserCard = false;
  hasDirectory = false;
  hasRecentCard = false;
  hasTagCard = false;

  get isDark() {
    return this._appThemeService.themeType === 'dark';
  }

  get isShowSearch(): boolean {
    return this._appSearchService.isShow;
  }

  get name() {
    return this._userInfo.ownerName;
  }

  ngOnInit() {
    this.initRoute();
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
      // rootDom.style.display = 'inline';
      // rootLoadingParent.removeChild(rootLoading);
      // setTimeout(() => {
      //   rootDom.style.display = 'inline';
      //   rootLoadingParent.removeChild(rootLoading);
      // }, 10000);
    } else {
      rootDom.style.display = 'inline';
      rootLoadingParent.removeChild(rootLoading);
    }
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
          console.log('当前路由data', data);
          this.layoutComponents = data?.layoutComponents ?? [];
          this.changeComponents();
        });
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

  changeTheme() {
    this._appThemeService.changeTheme();
  }

  showSearch() {
    this._appSearchService.changeStatus(true);
  }

  bugReport() {
    this._appDialogService.bugReport();
  }
}
