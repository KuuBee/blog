import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinkDialogRefComponent } from './create-link-dialog-ref.component';

describe('CreateLinkDialogRefComponent', () => {
  let component: CreateLinkDialogRefComponent;
  let fixture: ComponentFixture<CreateLinkDialogRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLinkDialogRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLinkDialogRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
