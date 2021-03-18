/*
 * @Descripttion: 用于管理一些 app 级别的dialog
 * @Author: KuuBee
 * @Date: 2021-01-18 11:18:07
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-14 16:20:48
 */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { BugReportDialogComponent } from '../components/bug-report-dialog/bug-report-dialog.component';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../components/register-dialog/register-dialog.component';
import { AuthDialogRefComponent } from '../components/auth-dialog-ref/auth-dialog-ref.component';
import { CreateLinkDialogRefComponent } from '@app/routes/friend-link/shared/components/create-link-dialog-ref/create-link-dialog-ref.component';
import { MediaObserver } from '@angular/flex-layout';

export namespace AppDialogType {
  export enum responseCode {
    'DEFAULT' = 1,
    'OPEN_LOGIN' = 2,
    'OPEN_REGISTER' = 3,
  }
  export interface Response<T = any> {
    // 规定
    // 1 为正常返回值 不做任何处理
    // 2 为打开注册dialog
    // 3 为打开登陆dialog
    code: responseCode;
    data: T;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AppDialogService {
  constructor(private _matDialog: MatDialog, private _media: MediaObserver) {}
  // private readonly dialogOptions: MatDialogConfig = {
  //   width: '30%',
  //   disableClose: true,
  // };
  get dialogOptions() {
    const opt: any = {
      disableClose: true,
    };
    if (!this._media.isActive('xs')) {
      opt.width = '30%';
    } else {
      opt.width = '80vw';
    }
    return opt;
  }
  login() {
    return this._matDialog.open<
      AuthDialogRefComponent,
      any,
      AppDialogType.Response
    >(AuthDialogRefComponent, this.dialogOptions);
  }
  createFriendLink() {
    return this._matDialog.open(
      CreateLinkDialogRefComponent,
      this.dialogOptions
    );
  }
  bugReport() {
    this._matDialog.open(BugReportDialogComponent, this.dialogOptions);
  }
}
