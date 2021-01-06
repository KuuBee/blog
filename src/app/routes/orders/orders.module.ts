import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderRouteResolverService } from './order-route-resolver.service';
import { SharedModule } from 'src/app/shared/shared.module';
// import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
  providers: [OrderRouteResolverService],
})
export class OrdersModule {}
