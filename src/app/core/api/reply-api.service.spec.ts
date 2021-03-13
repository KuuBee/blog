import { TestBed } from '@angular/core/testing';

import { ReplyApiService } from './reply-api.service';

describe('ReplyApiService', () => {
  let service: ReplyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
