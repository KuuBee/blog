import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBlhxWivesComponent } from './app-blhx-wives.component';

describe('AppBlhxWivesComponent', () => {
  let component: AppBlhxWivesComponent;
  let fixture: ComponentFixture<AppBlhxWivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBlhxWivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBlhxWivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
