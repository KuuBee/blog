import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarRefComponent } from './snack-bar-ref.component';

describe('SnackBarRefComponent', () => {
  let component: SnackBarRefComponent;
  let fixture: ComponentFixture<SnackBarRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
