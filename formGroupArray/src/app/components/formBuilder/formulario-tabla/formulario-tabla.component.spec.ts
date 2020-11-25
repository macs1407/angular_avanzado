import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTablaComponent } from './formulario-tabla.component';

describe('FormularioTablaComponent', () => {
  let component: FormularioTablaComponent;
  let fixture: ComponentFixture<FormularioTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
