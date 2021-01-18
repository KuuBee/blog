import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppDialogType } from '@app/shared/services/app-dialog.service';

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
    >
  ) {}
  registerForm = this._formBuilder.group({
    email: [''],
    name: [''],
    password: [''],
  });

  ngOnInit(): void {}
  submit() {
    this._matDialogRef.close({
      code: 1,
      data: null,
    });
  }
  login() {
    this._matDialogRef.close({
      code: 3,
      data: null,
    });
  }
}
