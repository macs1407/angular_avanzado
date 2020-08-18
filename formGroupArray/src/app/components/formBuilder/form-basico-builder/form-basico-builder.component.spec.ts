import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBasicoBuilderComponent } from './form-basico-builder.component';

describe('FormBasicoBuilderComponent', () => {
  let component: FormBasicoBuilderComponent;
  let fixture: ComponentFixture<FormBasicoBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBasicoBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBasicoBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
