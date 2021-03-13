import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToolbarInfoType } from '@app/theme/layout/layout.component';

@Component({
  selector: 'app-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.scss'],
})
export class DrawerContentComponent implements OnInit {
  constructor(private _route: Router) {}

  @Input() name?: string;
  @Input() toolbarInfo: ToolbarInfoType[] = [];
  @Input() drawer?: MatDrawer;

  ngOnInit(): void {}
  async toLink(link: string) {
    console.log('link', link, this.drawer);
    await this.drawer?.close();
    await this._route.navigateByUrl(link);
  }
}
