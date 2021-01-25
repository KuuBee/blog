import { TestBed } from '@angular/core/testing';

import { FormDataInterceptor } from './form-data.interceptor';

describe('FormDataInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FormDataInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FormDataInterceptor = TestBed.inject(FormDataInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
