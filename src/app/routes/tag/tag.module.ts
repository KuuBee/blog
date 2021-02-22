import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './index/tag.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [TagComponent],
  imports: [CommonModule, TagRoutingModule, SharedModule],
})
export class TagModule {}
