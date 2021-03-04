import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppDialogType } from '@app/shared/services/app-dialog.service';
import {
  noJavaScript,
  NO_JS_ERROR_MESSAGE,
} from '@app/shared/validators/index';
import { TokenApiService } from '@app/core/api/token-api.service';
import { ApiType } from '@app/core/api';
import { AppSnackBarService } from '@app/shared/services/app-snack-bar.service';
import { UserInfoService } from '@app/shared/services/user-info.service';
import { environment } from 'src/environments/environment';

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
    >,
    private _tokenApi: TokenApiService,
    private _appSnackBarService: AppSnackBarService,
    private _userInfoService: UserInfoService
  ) {}
  @Output()
  toRegister = new EventEmitter<boolean>();
  loginForm = this._formBuilder.group({
    name: [
      environment.production ? '' : 'test',
      [Validators.required, noJavaScript()],
    ],
    password: [
      environment.production ? '' : '123456',
      [Validators.required, noJavaScript()],
    ],
  });
  get name() {
    return this.loginForm.get('name');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get nameErrorMessage() {
    if (this.name?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESSAGE;
    }
    return '请输入昵称';
  }
  get passwordErrorMessage() {
    if (this.password?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESSAGE;
    }
    return '请输入密码';
  }

  ngOnInit(): void {}
  submit() {
    this._tokenApi
      .create({
        name: this.name?.value,
        password: this.password?.value,
      })
      .subscribe((res) => {
        console.log('create', res);
        const { accessToken, name, avatar } = res.data;
        this._userInfoService.setUserInfo({
          token: accessToken,
          avatar,
          name,
        });
        this._matDialogRef.close({
          code: AppDialogType.responseCode.DEFAULT,
          data: null,
        });
        // this._appSnackBarService.success(res.message);
      });
  }
  register() {
    this.toRegister.emit();
    // this._matDialogRef.close({
    //   code: AppDialogType.responseCode.OPEN_REGISTER,
    //   data: null,
    // });
  }
}
