import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationRoutingModule } from './classification-routing.module';
import { ClassificationComponent } from './index/classification.component';


@NgModule({
  declarations: [ClassificationComponent],
  imports: [
    CommonModule,
    ClassificationRoutingModule
  ]
})
export class ClassificationModule { }
