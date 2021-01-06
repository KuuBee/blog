import { TestBed } from '@angular/core/testing';

import { OrderRouteResolverService } from './order-route-resolver.service';

describe('OrderRouteResolverService', () => {
  let service: OrderRouteResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRouteResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
