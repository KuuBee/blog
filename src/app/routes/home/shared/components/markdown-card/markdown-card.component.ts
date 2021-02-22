import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-markdown-card',
  templateUrl: './markdown-card.component.html',
  styleUrls: ['./markdown-card.component.scss'],
})
export class MarkdownCardComponent implements OnInit {
  constructor() {}

  @Input() content: string = '';

  ngOnInit(): void {}
}
