import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchApiType } from '@app/core/api/search-api.service';
import { SearchListService } from '@app/shared/services/search-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss'],
})
export class TagCardComponent implements OnInit, OnDestroy {
  constructor(private _searchList: SearchListService) {}
  tagSub$?: Subscription;
  tagArr: SearchApiType.Response.IndexData[] = [];

  ngOnInit(): void {
    this.requestTagArr();
  }
  ngOnDestroy() {
    if (this.tagSub$) this.tagSub$.unsubscribe();
  }
  requestTagArr() {
    this.tagSub$ = this._searchList.tagObs$.subscribe((res) => {
      console.log(res);
      this.tagArr = res;
    });
  }
  trackById(_index: number, item: SearchApiType.Response.IndexData) {
    return item.id;
  }
}
