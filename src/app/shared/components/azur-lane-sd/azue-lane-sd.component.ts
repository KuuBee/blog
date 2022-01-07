import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
// @ts-expect-error
import refreshSvg from "src/assets/fonts/refresh.svg";

interface AzueLaneData {
  imageList: {
    name: string;
    url: string;
  }[];
  lines: {
    lines: string;
    recording: string | null;
  }[];
}

@Component({
  selector: 'app-azue-lane-sd',
  templateUrl: './azue-lane-sd.component.html',
  styleUrls: ['./azue-lane-sd.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({
          transform: 'scale(0)',
          opacity: 0,
        }),
        animate(
          '370ms',
          style({
            transform: 'scale(1)',
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '370ms',
          style({
            transform: 'scale(0)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AppAzueLaneSDComponent implements OnInit {
  constructor(private _http: HttpClient, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    console.log(refreshSvg);
    
    iconRegistry.addSvgIconLiteral('refresh', sanitizer.bypassSecurityTrustHtml(refreshSvg))
  }
  @ViewChild('audio') audioEl!: ElementRef<HTMLMediaElement>;

  azueLaneData: AzueLaneData[] = [];
  randomIndex: number = NaN;
  linesIndex: number = -1;
  isShowLines = false;
  linesEndTimer: NodeJS.Timeout | null = null;
  get currentData() {
    if (!this.azueLaneData.length) return null;
    const getRandomIndex = () =>
    (this.randomIndex = Math.ceil(
      (this.azueLaneData.length - 1) * Math.random()
    ));
    if (Number.isNaN(this.randomIndex)) getRandomIndex();
    const rightData = () => {
      if (this.azueLaneData[this.randomIndex].imageList.length) return;
      getRandomIndex();
      rightData();
    };
    rightData();
    return this.azueLaneData[this.randomIndex] ?? null;
  }
  ngOnInit(): void {
    this._init();
  }
  async _init() {
    const res = await this._http
      .get<AzueLaneData[]>(
        'https://autocode.icu/assets/images/blhx/data/blhx_gfs.json'
      )
      .toPromise();
    this.azueLaneData = res;
  }
  onClick() {
    if ((this.currentData?.lines.length ?? 0) <= 0) return;
    if (this.linesIndex < this.currentData!.lines.length - 1)
      this.linesIndex += 1;
    else this.linesIndex = 0;
    if (this.linesEndTimer) clearTimeout(this.linesEndTimer);
    setTimeout(() => {
      const el = this.audioEl.nativeElement;
      const duration = Number.isNaN(el.duration) ? 5 : el.duration;
      el.play().catch((error) => {
        console.log('播放失败');
        console.log(error);
      });
      this.isShowLines = true;
      this.linesEndTimer = setTimeout(() => {
        // this.isShowLines = false;
      }, Math.ceil(duration) * 1000);
    }, 500);
  }
}
