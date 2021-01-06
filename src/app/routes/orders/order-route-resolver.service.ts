import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { interval, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class OrderRouteResolverService implements Resolve<any> {
  test() {
    console.log(1);
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return 1;
    return interval(1000).pipe(take(2));
  }
}
