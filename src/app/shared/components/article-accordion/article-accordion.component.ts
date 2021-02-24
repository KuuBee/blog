import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ArticleApiType } from '@app/core/api/article-api.service';

@Component({
  selector: 'app-article-accordion',
  templateUrl: './article-accordion.component.html',
  styleUrls: ['./article-accordion.component.scss'],
})
export class ArticleAccordionComponent implements OnInit {
  constructor() {}
  @Input()
  get archiveArr() {
    return this._archiveArr;
  }
  set archiveArr(val: ArticleApiType.Response.IndexData[][]) {
    this._archiveArr = val;
    setTimeout(() => {
      this.accordion.openAll();
    }, 500);
  }
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  _archiveArr: ArticleApiType.Response.IndexData[][] = [];

  ngOnInit(): void {}
  getYear(date: string): number {
    return new Date(date).getFullYear();
  }
}
