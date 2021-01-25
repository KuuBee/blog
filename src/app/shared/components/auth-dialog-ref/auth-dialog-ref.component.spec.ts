import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogRefComponent } from './auth-dialog-ref.component';

describe('AuthDialogRefComponent', () => {
  let component: AuthDialogRefComponent;
  let fixture: ComponentFixture<AuthDialogRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDialogRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
