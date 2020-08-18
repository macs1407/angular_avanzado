import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBasicoBuilderGroupComponent } from './form-basico-builder-group.component';

describe('FormBasicoBuilderGroupComponent', () => {
  let component: FormBasicoBuilderGroupComponent;
  let fixture: ComponentFixture<FormBasicoBuilderGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBasicoBuilderGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBasicoBuilderGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
