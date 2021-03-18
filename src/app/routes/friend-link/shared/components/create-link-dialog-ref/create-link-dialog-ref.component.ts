import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FriendCardMode } from '@app/shared/components/friend-card/friend-card.component';
import { UserInfoService } from '@app/shared/services/user-info.service';
import { FriendLinkApiService } from '@app/core/api/friend-link-api.service';
import {
  httpsOnly,
  noJavaScript,
  NO_JS_ERROR_MESSAGE,
  HTTPS_ONLY_MESSAGE,
} from '@app/shared/validators';
import { AppUtilsService } from '@app/shared/services/app-utils.service';

@Component({
  selector: 'app-create-link-dialog-ref',
  templateUrl: './create-link-dialog-ref.component.html',
  styleUrls: ['./create-link-dialog-ref.component.scss'],
})
export class CreateLinkDialogRefComponent implements OnInit {
  constructor(
    private _matDialogRef: MatDialogRef<CreateLinkDialogRefComponent>,
    private _fb: FormBuilder,
    private _userInfo: UserInfoService,
    private _friendLinkApi: FriendLinkApiService,
    private _utils: AppUtilsService
  ) {}

  linkForm = this._fb.group({
    link: ['', [Validators.required, noJavaScript(), httpsOnly()]],
    title: ['', [Validators.required, noJavaScript()]],
    subtitle: ['', [Validators.required, noJavaScript()]],
    isUseAvatar: [false],
    avatarLink: ['', [Validators.required, noJavaScript(), httpsOnly()]],
  });
  // 表单用
  get isUseAvatar() {
    return this.linkForm.get('isUseAvatar');
  }
  get avatarLink() {
    return this.linkForm.get('avatarLink');
  }

  get linkErrorMsg() {
    if (this.linkForm.get('link')?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESSAGE;
    }
    return HTTPS_ONLY_MESSAGE;
  }
  get titleErrorMsg() {
    if (this.linkForm.get('title')?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESSAGE;
    }
    return '请输入博客名称';
  }
  get subtitleErrorMsg() {
    if (this.linkForm.get('subtitle')?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESSAGE;
    }
    return '请输入一段话';
  }
  get avatarLinkErrorMsg() {
    const avatarLink = this.linkForm.get('avatarLink');
    if (avatarLink?.hasError('noJavaScript')) {
      return NO_JS_ERROR_MESSAGE;
    }
    return HTTPS_ONLY_MESSAGE;
  }

  // 预览用
  get previewMode() {
    return FriendCardMode.PREVIEW;
  }
  get avatar() {
    if (this.isUseAvatar?.value) {
      const userAvatar = this._userInfo.avatar;
      if (this._userInfo.avatar) return userAvatar;
    }
    return this.avatarLink?.value;
  }

  ngOnInit(): void {}

  slideChange({ checked }: MatSlideToggleChange) {
    if (checked) {
      this.linkForm.removeControl('avatarLink');
    } else {
      this.linkForm.addControl(
        'avatarLink',
        this._fb.control('', [Validators.required, noJavaScript(), httpsOnly()])
      );
    }
  }

  close() {
    this._matDialogRef.close();
  }

  submit() {
    this._friendLinkApi
      .create({
        ...(this._utils.omit(this.linkForm.value, 'isUseAvatar') as any),
        avatarLink: this.avatar,
      })
      .subscribe((res) => {
        this.close();
      });
  }
}
