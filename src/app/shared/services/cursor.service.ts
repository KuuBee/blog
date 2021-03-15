import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { AppThemeService, ThemeType } from './app-theme.service';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  constructor(private _theme: AppThemeService) {}
  mouseSub?: Subscription;
  private ele?: HTMLElement;
  // 初始化服务
  init() {
    if (!this.ele) this.ele = document.createElement('div');
    const DIAMETER = 30;
    const RADIUS = DIAMETER / 2;
    this.ele.style.width = `${DIAMETER}px`;
    this.ele.style.height = `${DIAMETER}px`;
    this.ele.style.backgroundColor = 'transparent';
    this.ele.style.borderRadius = '99px';
    this.ele.style.border = '2px solid #1976D1';
    this.ele.style.position = 'fixed';
    this.ele.style.top = '-100px';
    this.ele.style.left = '-100px';
    // 忽略指针事件
    this.ele.style.pointerEvents = 'none';
    document.body.appendChild(this.ele);
    this.mouseSub = fromEvent<MouseEvent>(window, 'mousemove').subscribe(
      (res) => {
        if (this.ele) {
          this.ele.style.transition = 'none';
          this.ele.style.width = `${DIAMETER}px`;
          this.ele.style.height = `${DIAMETER}px`;
          this.ele.style.top = `${res.pageY - RADIUS}px`;
          this.ele.style.left = `${res.pageX - RADIUS}px`;
        }
      }
    );
    fromEvent<MouseEvent>(window, 'mousedown').subscribe((res) => {
      if (!this.ele) return;
      const _DIAMETER = 20;
      const _RADIUS = _DIAMETER / 2;
      this.ele.style.transition = 'all .1s';
      this.ele.style.width = `${_DIAMETER}px`;
      this.ele.style.height = `${_DIAMETER}px`;
      this.ele.style.top = `${res.pageY - _RADIUS}px`;
      this.ele.style.left = `${res.pageX - _RADIUS}px`;
    });
    fromEvent<MouseEvent>(window, 'mouseup').subscribe((res) => {
      if (!this.ele) return;
      const _DIAMETER = 30;
      const _RADIUS = _DIAMETER / 2;
      this.ele.style.transition = 'all .1s';
      this.ele.style.width = `${_DIAMETER}px`;
      this.ele.style.height = `${_DIAMETER}px`;
      this.ele.style.top = `${res.pageY - _RADIUS}px`;
      this.ele.style.left = `${res.pageX - _RADIUS}px`;
      setTimeout(() => {
        this.ele!.style.transition = 'none';
      }, 100);
    });
    this._theme.theme$.subscribe((res) => {
      if (!this.ele) return;
      if (res === 'dark') {
        this.ele.style.borderColor = '#1976D1';
      } else {
        this.ele.style.borderColor = '#253337';
      }
    });
  }
}
