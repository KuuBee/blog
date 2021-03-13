import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AppSearchService } from '@app/shared/services/app-search.service';
import { AppThemeService } from '@app/shared/services/app-theme.service';
import { UserInfoService } from '@app/shared/services/user-info.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private _appThemeService: AppThemeService,
    private _appSearchService: AppSearchService,
    private _userInfo: UserInfoService
  ) {}
  @Input() isXs = false;
  @Input() drawer?: MatDrawer;
  readonly toolbarStyle: any = {
    'justify-content': 'space-between',
  };
  get isDark() {
    return this._appThemeService.themeType === 'dark';
  }

  get isShowSearch(): boolean {
    return this._appSearchService.isShow;
  }

  get name() {
    return this._userInfo.ownerName;
  }

  ngOnInit(): void {}

  changeTheme() {
    this._appThemeService.changeTheme();
  }

  showSearch() {
    this._appSearchService.changeStatus(true);
  }
}
