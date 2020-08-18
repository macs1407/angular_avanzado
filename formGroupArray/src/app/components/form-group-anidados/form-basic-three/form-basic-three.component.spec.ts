import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBasicThreeComponent } from './form-basic-three.component';

describe('FormBasicThreeComponent', () => {
  let component: FormBasicThreeComponent;
  let fixture: ComponentFixture<FormBasicThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBasicThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBasicThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
