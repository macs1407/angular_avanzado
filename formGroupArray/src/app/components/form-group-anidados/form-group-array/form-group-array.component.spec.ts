import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupArrayComponent } from './form-group-array.component';

describe('FormGroupArrayComponent', () => {
  let component: FormGroupArrayComponent;
  let fixture: ComponentFixture<FormGroupArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
