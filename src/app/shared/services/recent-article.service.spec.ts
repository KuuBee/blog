import { TestBed } from '@angular/core/testing';

import { RecentArticleService } from './recent-article.service';

describe('RecentArticleService', () => {
  let service: RecentArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
