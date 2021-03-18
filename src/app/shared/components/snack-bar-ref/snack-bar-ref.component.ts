import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export namespace SnackBarRefType {
  export interface Props {
    type: 'none' | 'success' | 'warning' | 'error';
    message: string;
  }
}

@Component({
  selector: 'app-snack-bar-ref',
  templateUrl: './snack-bar-ref.component.html',
  styleUrls: ['./snack-bar-ref.component.scss'],
})
export class SnackBarRefComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private _props: SnackBarRefType.Props
  ) {}
  get message() {
    return this._props.message;
  }
  get icon() {
    let iconStr: string;
    switch (this._props.type) {
      case 'success':
        iconStr = 'check_circle';
        break;
      case 'warning':
        // report_problem
        // info
        // warning
        iconStr = 'warning';
        break;
      case 'error':
        iconStr = 'error';
        break;

      default:
        iconStr = '';
        break;
    }
    return iconStr;
  }

  ngOnInit(): void {
    
  }
}
