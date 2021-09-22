import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface BlhxData {
  imageList: {
    name: string;
    url: string;
  }[];
  lines: {
    lines: string;
    recording: string | null;
  };
}

@Component({
  selector: 'app-blhx-wives',
  templateUrl: './app-blhx-wives.component.html',
  styleUrls: ['./app-blhx-wives.component.scss'],
})
export class AppBlhxWivesComponent implements OnInit {
  constructor(private _http: HttpClient) {}
  blhxData: BlhxData[] = [];
  r: number = NaN;
  get currentData() {
    if (!this.blhxData.length) return null;
    if (Number.isNaN(this.r)) {
      this.r = Math.ceil((this.blhxData.length - 1) * Math.random());
    }
    return this.blhxData[this.r] ?? null;
  }
  ngOnInit(): void {
    this._init();
  }
  async _init() {
    const localData = localStorage.blhxWivesData;
    if (localStorage) {
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
}
