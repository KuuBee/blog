import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAzueLaneSDComponent } from './azue-lane-sd.component';

describe('AppAzueLaneSDComponent', () => {
  let component: AppAzueLaneSDComponent;
  let fixture: ComponentFixture<AppAzueLaneSDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAzueLaneSDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAzueLaneSDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
