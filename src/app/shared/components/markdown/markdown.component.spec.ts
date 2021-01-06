import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
  let component: AppMarkdownComponent;
  let fixture: ComponentFixture<AppMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppMarkdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
