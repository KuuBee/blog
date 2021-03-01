import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendLinkRoutingModule } from './friend-link-routing.module';
import { FriendLinkComponent } from './index/friend-link.component';
import { SharedModule } from '@app/shared/shared.module';
import { CreateLinkDialogRefComponent } from './shared/components/create-link-dialog-ref/create-link-dialog-ref.component';

@NgModule({
  declarations: [FriendLinkComponent, CreateLinkDialogRefComponent],
  imports: [CommonModule, FriendLinkRoutingModule, SharedModule],
})
export class FriendLinkModule {}
