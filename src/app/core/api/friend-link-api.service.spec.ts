import { TestBed } from '@angular/core/testing';

import { FriendLinkApiService } from './friend-link-api.service';

describe('FriendLinkApiService', () => {
  let service: FriendLinkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendLinkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
