import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppDialogService } from '@app/shared/services/app-dialog.service';
import { noJavaScript } from '@app/shared/validators/index';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _matDialogRef: MatDialogRef<LoginDialogComponent>,
    private _appDialogService: AppDialogService
  ) {}
  loginForm = this._formBuilder.group({
    name: ['', [Validators.required, noJavaScript()]],
    password: ['', Validators.required],
  });
  get name() {
    return this.loginForm.get('name');
  }
  get nameErrorMessage() {
    console.log(this.name?.hasError('aaaa'));

    return '';
  }

  ngOnInit(): void {}
  submit() {
    this._matDialogRef.close();
  }
  register() {
    this._matDialogRef.close();
    this._appDialogService.register();
  }
}
