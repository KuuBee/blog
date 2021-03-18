import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, AppRoutingModule],
})
export class RoutesModule {}

// FIXME 路由复用策略 暂时没搞定
export class CustomReuseStrategy implements RouteReuseStrategy {
  public handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // if (!route.data.keep) {
    //   return false;
    // }
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route?.routeConfig?.path) {
      this.handlers[route?.routeConfig?.path ?? ''] = handle;
      console.log('handlers', this.handlers);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log(
      'shouldAttach',
      !!route.routeConfig && !!this.handlers[route?.routeConfig?.path ?? ''],
      route
    );

    return (
      !!route.routeConfig && !!this.handlers[route?.routeConfig?.path ?? '']
    );
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (route?.routeConfig?.path) {
      console.log(
        '存在path，应该有缓存',
        this.handlers[route.routeConfig.path]
      );

      return this.handlers[route.routeConfig.path] ?? null;
    }
    return null;

    // if (!route.routeConfig) return null;
    // if (route.routeConfig.loadChildren) return null;
    // return this.handlers[route?.routeConfig?.path ?? ''];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    console.log('future.path', future);

    return future.routeConfig === current.routeConfig;
  }
}
