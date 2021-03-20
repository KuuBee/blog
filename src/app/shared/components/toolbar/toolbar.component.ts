import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AppDialogService } from '@app/shared/services/app-dialog.service';
import { AppSearchService } from '@app/shared/services/app-search.service';
import { AppThemeService } from '@app/shared/services/app-theme.service';
import { UserInfoService } from '@app/shared/services/user-info.service';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private _themeService: AppThemeService,
    private _searchService: AppSearchService,
    private _userInfo: UserInfoService,
    private _dialog: AppDialogService,
    private _auth: AuthService
  ) {}
  @Input() isXs = false;
  @Input() drawer?: MatDrawer;
  readonly toolbarStyle: any = {
    'justify-content': 'space-between',
  };
  get isDark() {
    return this._themeService.ThemeType === 'dark';
  }

  get isShowSearch(): boolean {
    return this._searchService.isShow;
  }

  get name() {
    return this._userInfo.ownerName;
  }
  get isLogin() {
    return this._auth.isLogin;
  }

  ngOnInit(): void {}

  changeTheme() {
    this._themeService.changeTheme();
  }

  showSearch() {
    this._searchService.changeStatus(true);
  }
  login() {
    this._dialog.login();
  }
  logout() {
    this._auth.logout();
  }
  toGithub() {
    window.open('https://github.com/KuuBee/blog/issues');
  }
}
