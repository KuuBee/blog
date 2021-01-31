import { TestBed } from '@angular/core/testing';

import { AppDomService } from './app-dom.service';

describe('AppDomService', () => {
  let service: AppDomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
