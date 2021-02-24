import { TestBed } from '@angular/core/testing';

import { ClassificationApiService } from './classification-api.service';

describe('ClassificationApiService', () => {
  let service: ClassificationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
