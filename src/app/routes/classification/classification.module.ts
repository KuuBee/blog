import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationRoutingModule } from './classification-routing.module';
import { ClassificationComponent } from './index/classification.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ClassificationComponent],
  imports: [CommonModule, ClassificationRoutingModule, SharedModule],
})
export class ClassificationModule {}
