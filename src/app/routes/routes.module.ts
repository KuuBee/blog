import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import {
  RouteReuseStrategy,
} from '@angular/router';
import { CustomReuseStrategy } from "./route-reuse-strategy";

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  providers: [
    /*路由复用策略*/
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ]
})
export class RoutesModule { }
