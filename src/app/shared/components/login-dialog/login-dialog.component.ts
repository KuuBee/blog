import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppDialogType } from '@app/shared/services/app-dialog.service';
import { noJavaScript } from '@app/shared/validators/index';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _matDialogRef: MatDialogRef<
      LoginDialogComponent,
      AppDialogType.Response
    >
    // private _AuthApi
  ) {}
  loginForm = this._formBuilder.group({
    name: ['', [Validators.required, noJavaScript()]],
    password: ['', [Validators.required, noJavaScript()]],
  });
  get name() {
    return this.loginForm.get('name');
  }
  get nameErrorMessage() {
    if (this.name?.hasError('noJavaScript')) {
      return '拜托请不要写一些奇奇怪怪的东西';
    } else if (this.name?.hasError('required')) {
      return '请输入昵称';
    }
    return '未知错误';
  }
  get passwordErrorMessage() {
    if (this.name?.hasError('noJavaScript')) {
      return '拜托请不要写一些奇奇怪怪的东西';
    } else if (this.name?.hasError('required')) {
      return '请输入密码';
    }
    return '未知错误';
  }

  ngOnInit(): void {}
  submit() {
    
    // this._matDialogRef.close({
    //   code: 1,
    //   data: null,
    // });
  }
  register() {
    this._matDialogRef.close({
      code: 2,
      data: null,
    });
  }
}
