/*
 * @Descripttion: 用于管理一些 app 级别的dialog
 * @Author: 杨湛杰
 * @Date: 2021-01-18 11:18:07
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-18 11:45:16
 */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BugReportDialogComponent } from '../components/bug-report-dialog/bug-report-dialog.component';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../components/register-dialog/register-dialog.component';

export namespace AppDialogType {
  export interface Response<T = any> {
    // 规定
    // 1 为正常返回值
    // 2 为打开注册dialog
    // 3 为打开登陆dialog
    code: number;
    data: T;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AppDialogService {
  constructor(private _matDialog: MatDialog) {}
  private readonly dialogOptions: MatDialogConfig = {
    width: '20%',
    disableClose: true,
  };
  login() {
    console.log('登陆');
    const dialogRef = this._matDialog.open<
      LoginDialogComponent,
      any,
      AppDialogType.Response
    >(LoginDialogComponent, this.dialogOptions);
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res?.code === 2) {
        // 需要打开注册dialog
        this.register();
      }
    });
  }
  register() {
    console.log('注册');
    const dialogRef = this._matDialog.open<
      RegisterDialogComponent,
      any,
      AppDialogType.Response
    >(RegisterDialogComponent, this.dialogOptions);
    dialogRef.afterClosed().subscribe((res) => {
      if (res?.code === 3) {
        this.login();
      }
    });
  }
  bugReport() {
    console.log('bug');
    this._matDialog.open(BugReportDialogComponent, this.dialogOptions);
  }
}
