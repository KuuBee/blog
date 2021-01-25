import { TestBed } from '@angular/core/testing';

import { AppSnackBarService } from './app-snack-bar.service';

describe('AppSnackbBarService', () => {
  let service: AppSnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
