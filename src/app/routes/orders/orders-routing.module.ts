import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderRouteResolverService } from './order-route-resolver.service';

import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    resolve: {
      crisis: OrderRouteResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
