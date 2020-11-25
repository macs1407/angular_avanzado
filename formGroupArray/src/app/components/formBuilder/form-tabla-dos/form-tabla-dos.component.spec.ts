import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTablaDosComponent } from './form-tabla-dos.component';

describe('FormTablaDosComponent', () => {
  let component: FormTablaDosComponent;
  let fixture: ComponentFixture<FormTablaDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTablaDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTablaDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
