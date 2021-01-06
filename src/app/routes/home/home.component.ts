import { Component, HostBinding, OnInit } from '@angular/core';
import { homePageAnimation } from './shared/animation/home.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [homePageAnimation],
})
export class HomeComponent implements OnInit {
  constructor() {}
  @HostBinding('@homePageAnimation')
  public animatePage = true;

  ngOnInit(): void {}
}
