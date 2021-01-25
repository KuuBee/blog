import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-dialog-ref',
  templateUrl: './auth-dialog-ref.component.html',
  styleUrls: ['./auth-dialog-ref.component.scss'],
})
export class AuthDialogRefComponent implements OnInit {
  constructor() {}
  @Input()
  isShowLogin = true;

  ngOnInit(): void {}
}
