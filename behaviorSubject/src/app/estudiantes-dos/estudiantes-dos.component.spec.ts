import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesDosComponent } from './estudiantes-dos.component';

describe('EstudiantesDosComponent', () => {
  let component: EstudiantesDosComponent;
  let fixture: ComponentFixture<EstudiantesDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
