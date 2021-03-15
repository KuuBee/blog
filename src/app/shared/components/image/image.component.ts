import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input()
  get src() {
    return this._scr;
  }
  set src(val: string) {
    console.log('val', val);

    this._scr = val;
  }
  @Input() alt: string = 'A! 我裂开了';
  @Input() drag: boolean = false;

  private _scr: string = '';

  constructor() {}

  ngOnInit(): void {}
  dragstart() {
    return this.drag;
  }
}
