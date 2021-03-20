import { TestBed } from '@angular/core/testing';

import { RpcApiService } from './rpc-api.service';

describe('RpcApiService', () => {
  let service: RpcApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RpcApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
