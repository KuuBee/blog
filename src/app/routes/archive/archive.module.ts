import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveComponent } from './index/archive.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ArchiveComponent],
  imports: [CommonModule, ArchiveRoutingModule, SharedModule],
})
export class ArchiveModule {}
