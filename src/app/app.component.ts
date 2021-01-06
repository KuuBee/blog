import { AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { searchBarBlurAnimation } from './shared/animation/app-search.animation';
import { slideInAnimation } from './shared/animation/router.animation';
import { AppSearchService } from './shared/services/app-search.service';
import { AppThemeService } from './shared/services/app-theme.service';
import { UserInfoService } from './shared/services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [searchBarBlurAnimation, slideInAnimation],
})
export class AppComponent implements OnInit {
  constructor(
    private _appThemeService: AppThemeService,
    private _appSearchService: AppSearchService,
    private _userInfo: UserInfoService
  ) {}
  get isDark() {
    return this._appThemeService.themeType === 'dark';
  }
  get isShowSearch(): boolean {
    return this._appSearchService.isShow;
  }
  get name() {
    return this._userInfo.userName;
  }
  ngOnInit() {
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
  changeTheme() {
    this._appThemeService.changeTheme();
  }
  showSearch() {
    this._appSearchService.changeStatus(true);
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
