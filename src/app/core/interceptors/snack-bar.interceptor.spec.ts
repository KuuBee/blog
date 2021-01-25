import { TestBed } from '@angular/core/testing';

import { SnackBarInterceptor } from './snack-bar.interceptor';

describe('SnackBarInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SnackBarInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SnackBarInterceptor = TestBed.inject(SnackBarInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
