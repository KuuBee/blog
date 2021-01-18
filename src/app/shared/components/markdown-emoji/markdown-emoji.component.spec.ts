import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownEmojiComponent } from './markdown-emoji.component';

describe('MarkdownEmojiComponent', () => {
  let component: MarkdownEmojiComponent;
  let fixture: ComponentFixture<MarkdownEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownEmojiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
