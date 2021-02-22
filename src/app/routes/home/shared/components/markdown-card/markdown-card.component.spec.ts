import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownCardComponent } from './markdown-card.component';

describe('MarkdownCardComponent', () => {
  let component: MarkdownCardComponent;
  let fixture: ComponentFixture<MarkdownCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
