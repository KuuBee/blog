import { Component, OnInit } from '@angular/core';
import { TagApiService, TagApiType } from '@app/core/api/tag-api.service';

type TagIndexData = TagApiType.Response.IndexData;
@Component({
  selector: 'app-tag-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private _tagApi: TagApiService) {}
  tagArr: TagIndexData[] = [];

  ngOnInit(): void {
    this.requestTagIndex();
  }
  requestTagIndex() {
    this._tagApi.index().subscribe((res) => {
      this.tagArr = res.data;
    });
  }
  trackById(_index: number, item: TagIndexData) {
    return item.tagId;
  }
  setStyle(item: TagIndexData) {
    // 50-18
    const MAX_ADDITIONAL_SIZE = 32;
    // (1-0.7)*100
    const MAX_ADDITIONAL_OPACITY = 30;
    const count = item.count;
    const additionalSize =
      count >= MAX_ADDITIONAL_SIZE ? MAX_ADDITIONAL_SIZE : count;
    const additionalOpacity =
      count >= MAX_ADDITIONAL_OPACITY ? 0.3 : count / 100;
    return {
      fontSize: `${18 + additionalSize}px`,
      opacity: `${0.7 + additionalOpacity}`,
    };
  }
}
