import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFormArrayComponent } from './validation-form-array.component';

describe('ValidationFormArrayComponent', () => {
  let component: ValidationFormArrayComponent;
  let fixture: ComponentFixture<ValidationFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
