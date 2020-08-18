import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBasicTwoComponent } from './form-basic-two.component';

describe('FormBasicTwoComponent', () => {
  let component: FormBasicTwoComponent;
  let fixture: ComponentFixture<FormBasicTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBasicTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBasicTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
