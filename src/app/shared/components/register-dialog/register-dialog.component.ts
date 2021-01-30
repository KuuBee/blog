import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserApiService } from '@app/core/api/user-api.service';
import { AppDialogType } from '@app/shared/services/app-dialog.service';
import { UserInfoService } from '@app/shared/services/user-info.service';
import { noJavaScript, NO_JS_ERROR_MESAGE } from '@app/shared/validators';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _matDialogRef: MatDialogRef<
      RegisterDialogComponent,
      AppDialogType.Response
    >,
    private _userApiService: UserApiService,
    private _userInfoService: UserInfoService
  ) {}
  @Output()
  toLogin = new EventEmitter();

  registerForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email, noJavaScript()]],
    name: ['', [Validators.required, Validators.maxLength(10), noJavaScript()]],
    password: ['', [Validators.required, noJavaScript()]],
    avatar: ['', [FileValidator.maxContentSize(1024 * 150)]],
  });
  defaultAvatarIndex = 0;
  selectdefaultAvatarIndex = 0;

  private get _defaultAvatar() {
    const baseImgUrl = 'https://autocode.icu/assets/images/default-avatar/';
    const baseArr = [1, 2, 3, 4, 5];
    return [1, 2, 3].map((item) => {
      return baseArr.map((subItem) => {
        return `${baseImgUrl}${item}.${subItem}.jpg`;
      });
    });
  }
  get defaultAvatar() {
    return this._defaultAvatar[
      this.defaultAvatarIndex % this._defaultAvatar.length
    ];
  }

  get emailErrorMsg() {
    const email = this.registerForm.get('email');
    if (email?.hasError('email')) {
      return '你这是个邮箱!?';
    } else if (email?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESAGE;
    }
    return '请填写邮箱';
  }
  get nameErrorMsg() {
    const name = this.registerForm.get('name');
    if (name?.hasError('maxlength')) {
      return '你的名字也太长了吧,少点..';
    } else if (name?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESAGE;
    }
    return '请填写昵称';
  }
  get passwordErrorMsg() {
    const password = this.registerForm.get('password');
    if (password?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESAGE;
    }
    return '请填写密码';
  }
  get avatarErrorMsg() {
    return '图片最大不能超过150kb,请可怜可怜小水管吧';
  }

  ngOnInit(): void {
    console.log(this.defaultAvatar);
  }
  fileInput() {
    // console.log(this.registerForm.get('avatar')?.value);
    this.selectdefaultAvatarIndex = NaN;
    // this.registerForm.get('avatar')?.setValue(null);
  }
  submit() {
    const { name, password, email, avatar } = this.registerForm.value;
    this._userApiService
      .create({
        name,
        file: avatar?.files?.[0],
        defaultAvatar: this.defaultAvatar[this.selectdefaultAvatarIndex],
        password,
        email,
      })
      .subscribe((res) => {
        console.log(res);
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
      });
  }
  login() {
    this.toLogin.emit();
  }
}
