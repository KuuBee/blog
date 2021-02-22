import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendLinkComponent } from './index/friend-link.component';

const routes: Routes = [{ path: '', component: FriendLinkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendLinkRoutingModule {}
