import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendLinkRoutingModule } from './friend-link-routing.module';
import { FriendLinkComponent } from './index/friend-link.component';


@NgModule({
  declarations: [FriendLinkComponent],
  imports: [
    CommonModule,
    FriendLinkRoutingModule
  ]
})
export class FriendLinkModule { }
