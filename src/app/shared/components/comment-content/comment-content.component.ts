import { Component, Input, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import browserInfo from 'browser-info';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
  styleUrls: ['./comment-content.component.scss'],
})
export class CommentContentComponent implements OnInit {
  constructor(private _platformLocation: PlatformLocation) {}
  @Input() recursion: boolean = true;
  showComment = false;
  get createDate() {
    return new Date();
  }
  get browserInfoText() {
    const data = browserInfo();
    return `${data.name} ${data.version}/${data.os}`;
  }
  get avatarStyle() {
    if (this.recursion) {
      return {};
    } else {
      return {
        width: '50px',
        height: '50px',
      };
    }
  }

  ngOnInit(): void {
    // console.log(this._platformLocation);
  }
}
