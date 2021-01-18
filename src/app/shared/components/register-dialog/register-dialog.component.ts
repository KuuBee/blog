import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppDialogService } from '@app/shared/services/app-dialog.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _matDialogRef: MatDialogRef<RegisterDialogComponent>,
    private _appDialogService: AppDialogService
  ) {}
  registerForm = this._formBuilder.group({
    email: [''],
    name: [''],
    password: [''],
  });

  ngOnInit(): void {}
  submit() {
    this._matDialogRef.close();
  }
  login() {
    this._matDialogRef.close();
    this._appDialogService.login();
  }
}
