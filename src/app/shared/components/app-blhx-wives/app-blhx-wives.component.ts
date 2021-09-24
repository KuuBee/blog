import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface BlhxData {
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
  selector: 'app-blhx-wives',
  templateUrl: './app-blhx-wives.component.html',
  styleUrls: ['./app-blhx-wives.component.scss'],
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
export class AppBlhxWivesComponent implements OnInit {
  constructor(private _http: HttpClient) {}

  @ViewChild('audio') audioEl!: ElementRef<HTMLMediaElement>;

  blhxData: BlhxData[] = [];
  randomIndex: number = NaN;
  linesIndex: number = -1;
  isShowLines = false;
  linesEndTimer: NodeJS.Timeout | null = null;
  get currentData() {
    if (!this.blhxData.length) return null;
    const getRandomIndex = () =>
      (this.randomIndex = Math.ceil(
        (this.blhxData.length - 1) * Math.random()
      ));
    if (Number.isNaN(this.randomIndex)) getRandomIndex();
    const rightData = () => {
      if (this.blhxData[this.randomIndex].imageList.length) return;
      getRandomIndex();
      rightData();
    };
    rightData();
    console.log(this.randomIndex);
    return this.blhxData[this.randomIndex] ?? null;
  }
  ngOnInit(): void {
    this._init();
  }
  async _init() {
    const localData = localStorage.blhxWivesData;
    if (localStorage.blhxWivesData) {
      this.blhxData = JSON.parse(localData);
    } else {
      const res = await this._http
        .get<BlhxData[]>(
          'https://autocode.icu/assets/images/blhx/data/blhx_gfs.json'
        )
        .toPromise();
      this.blhxData = res;
      window.localStorage.blhxWivesData = JSON.stringify(res);
    }
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
        this.isShowLines = false;
      }, Math.ceil(duration) * 1000);
    }, 500);
  }
}
