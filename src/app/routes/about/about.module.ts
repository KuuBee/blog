import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './index/about.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [SharedModule, CommonModule, AboutRoutingModule],
})
export class AboutModule {}
