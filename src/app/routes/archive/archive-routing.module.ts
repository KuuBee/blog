import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchiveComponent } from './index/archive.component';

const routes: Routes = [{ path: 'archive', component: ArchiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchiveRoutingModule {}
