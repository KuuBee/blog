import { Component, Input, OnInit } from '@angular/core';
import { AppThemeService } from '@app/shared/services/app-theme.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  constructor(private _appTheme: AppThemeService) {}
  @Input() count: number = 1;
  @Input() width: string = '100%';
  get theme() {
    const defalutCss: any = {
      width: this.width,
      height: '30px',
      outline: 'none',
      'animation-duration': '2s',
    };
    let resCss: any;
    if (this._appTheme.themeType === 'dark') {
      resCss = Object.assign(defalutCss, {
        'background-color': '#323232',
        border: '1px solid #323232',
      });
    } else {
      resCss = Object.assign(defalutCss, {
        'background-color': '#eff1f6',
        border: '1px solid #eff1f6',
      });
    }
    return resCss;
  }

  ngOnInit(): void {}
}
