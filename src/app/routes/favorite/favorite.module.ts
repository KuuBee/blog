import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, FavoriteRoutingModule, SharedModule],
})
export class FavoriteModule {}
