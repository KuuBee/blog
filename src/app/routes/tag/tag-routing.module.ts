import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: 'tag', component: IndexComponent },
  {
    path: 'tag/:id',
    component: InfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagRoutingModule {}
