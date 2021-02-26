import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationRoutingModule } from './classification-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '@app/shared/shared.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [IndexComponent, InfoComponent],
  imports: [CommonModule, ClassificationRoutingModule, SharedModule],
})
export class ClassificationModule {}
