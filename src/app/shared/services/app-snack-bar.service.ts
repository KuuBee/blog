import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  SnackBarRefComponent,
  SnackBarRefType,
} from '../components/snack-bar-ref/snack-bar-ref.component';

export namespace AppSnackBarServiceType {
  export type Config = Omit<MatSnackBarConfig<SnackBarRefType.Props>, 'data'>;
}

@Injectable({
  providedIn: 'root',
})
export class AppSnackBarService {
  constructor(private _matSnackBar: MatSnackBar) {}
  
  open(message: string, action = '关闭', config?: MatSnackBarConfig) {
    this._matSnackBar.open(message, action, config);
  }
  success(message: string, config?: AppSnackBarServiceType.Config) {
    const snackBarData: SnackBarRefType.Props = {
      type: 'success',
      message,
    };
    this._openStatusSnackBar(snackBarData, config);
  }
  warning(message: string, config?: AppSnackBarServiceType.Config) {
    const snackBarData: SnackBarRefType.Props = {
      type: 'warning',
      message,
    };
    this._openStatusSnackBar(snackBarData, config);
  }
  error(message: string, config?: AppSnackBarServiceType.Config) {
    const snackBarData: SnackBarRefType.Props = {
      type: 'error',
      message,
    };
    this._openStatusSnackBar(snackBarData, config);
  }
  // 打开有状态的snackBar
  private _openStatusSnackBar(
    data: SnackBarRefType.Props,
    config?: AppSnackBarServiceType.Config
  ) {
    this._matSnackBar.openFromComponent(SnackBarRefComponent, {
      ...config,
      // 这里不考虑 type 为 none 的情况
      panelClass: `app-snack-bar--${data.type}`,
      data,
    });
  }
}
