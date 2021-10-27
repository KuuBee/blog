/*
 * @Descripttion: 路由复用
 * @Author: KuuBee
 * @Date: 2021-10-27 10:09:06
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-27 13:50:14
 */
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

// 路由复用
export class CustomReuseStrategy implements RouteReuseStrategy {
  // 缓存路由
  private _storedRoutes = new Map<string, DetachedRouteHandle>();

  // 是否进入 retrieve 方法读取缓存
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this._storedRoutes.has(this._getKey(route));
  }

  // 读取缓存
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this._storedRoutes.get(this._getKey(route)) ?? null;
  }
  // 离开时判断是否需要缓存
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.component;
  }

  // 缓存组件
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (!this._storedRoutes.has(this._getKey(route))) {
      this._storedRoutes.set(this._getKey(route), handle);
    }
  }

  // 是否需要缓存
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    // 默认
    return future.routeConfig === current.routeConfig;
  }

  // 获取路由key
  private _getKey(route: ActivatedRouteSnapshot): string {
    return route.toString();
  }
}
