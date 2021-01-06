import { TestBed } from '@angular/core/testing';

import { AppMarkdownService } from './app-markdown.service';

describe('AppMarkdownService', () => {
  let service: AppMarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMarkdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
