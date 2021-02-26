import { Component, OnInit } from '@angular/core';
import {
  ClassificationApiService,
  ClassificationApiType,
} from '@app/core/api/classification-api.service';

type ClassIndexData = ClassificationApiType.Response.IndexData;
@Component({
  selector: 'app-classification',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private _classificationApi: ClassificationApiService) {}
  classArr: ClassIndexData[] = [];

  ngOnInit(): void {
    this.requestClassificationIndex();
  }

  requestClassificationIndex() {
    this._classificationApi.index().subscribe((res) => {
      this.classArr = res.data;
    });
  }

  setStyle(item: ClassIndexData) {
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
  trackById(_index: number, item: ClassIndexData) {
    return item.classificationId;
  }
}
