/*
 * @Descripttion: 用于管理一些 app 级别的dialog
 * @Author: 杨湛杰
 * @Date: 2021-01-18 11:18:07
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-18 11:23:19
 */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BugReportDialogComponent } from '../components/bug-report-dialog/bug-report-dialog.component';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../components/register-dialog/register-dialog.component';

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
    this._matDialog.open(LoginDialogComponent, this.dialogOptions);
  }
  register() {
    this._matDialog.open(RegisterDialogComponent, this.dialogOptions);
  }
  bugReport() {
    this._matDialog.open(BugReportDialogComponent, this.dialogOptions);
  }
}
