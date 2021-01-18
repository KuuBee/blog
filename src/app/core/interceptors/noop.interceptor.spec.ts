import { TestBed } from '@angular/core/testing';

import { NoopInterceptor } from './noop.interceptor';

describe('NoopInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NoopInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NoopInterceptor = TestBed.inject(NoopInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
