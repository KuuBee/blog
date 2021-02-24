import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAccordionComponent } from './article-accordion.component';

describe('ArticleAccordionComponent', () => {
  let component: ArticleAccordionComponent;
  let fixture: ComponentFixture<ArticleAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
