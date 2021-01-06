import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSearchService {
  constructor() {}
  private _isShow = false;
  get isShow():boolean {
    return this._isShow;
  }
  changeStatus(status: boolean = !this._isShow) {
    this._isShow = status;
  }
}
