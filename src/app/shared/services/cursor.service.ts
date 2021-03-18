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
    this.ele.style.zIndex = '1010';
    // 忽略指针事件
    this.ele.style.pointerEvents = 'none';
    document.body.appendChild(this.ele);

    this._mousedown();
    this._mouseup();
    this._mousemove(DIAMETER, RADIUS);
    this._mouseenter();
    this._mouseleave();
    this._themeChange();
  }
  // 小圈圈变小
  private _mousedown() {
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
  }
  // 小圈圈恢复大小
  private _mouseup() {
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
  }
  // 移动小圈圈
  private _mousemove(diameter: number, radius: number) {
    this.mouseSub = fromEvent<MouseEvent>(window, 'mousemove').subscribe(
      (res) => {
        if (this.ele) {
          this.ele.style.transition = 'none';
          this.ele.style.width = `${diameter}px`;
          this.ele.style.height = `${diameter}px`;
          this.ele.style.top = `${res.pageY - radius}px`;
          this.ele.style.left = `${res.pageX - radius}px`;
        }
      }
    );
  }
  // 进入视窗时显示小圈圈
  private _mouseenter() {
    fromEvent(document.body, 'mouseenter').subscribe((res) => {
      if (!this.ele) return;
      this.ele.style.display = 'block';
    });
  }
  // 移除视窗时隐藏小圈圈
  private _mouseleave() {
    fromEvent(document.body, 'mouseleave').subscribe((res) => {
      if (!this.ele) return;
      this.ele.style.display = 'none';
    });
  }
  // 改变主题时 改变小圈圈样式
  private _themeChange() {
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
