/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2020-12-10 10:16:42
 * @LastEditors: KuuBee
 * @LastEditTime: 2020-12-10 10:21:10
 */

import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class AppRouteReuseStrategy implements RouteReuseStrategy {
  /** Determines if this route (and its subtree) should be detached to be reused later */
  shouldDetach(route: ActivatedRouteSnapshot) {
    return true;
  }
  /**
   * Stores the detached route.
   *
   * Storing a `null` value should erase the previously stored value.
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null) {
    console.log('store----');
    console.log('route', route);
    console.log('handle', handle);
  }
  /** Determines if this route (and its subtree) should be reattached */
  shouldAttach(route: ActivatedRouteSnapshot) {
    return true;
  }
  /** Retrieves the previously stored route */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }
  /** Determines if a route should be reused */
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return true;
  }
}
