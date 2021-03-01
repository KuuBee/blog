import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss'],
})
export class NoContentComponent implements OnInit {
  constructor() {}

  @Input() message: string = '这里什么都没有!';

  ngOnInit(): void {}
}
