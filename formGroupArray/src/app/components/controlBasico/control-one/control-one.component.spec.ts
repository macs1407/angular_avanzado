import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlOneComponent } from './control-one.component';

describe('ControlOneComponent', () => {
  let component: ControlOneComponent;
  let fixture: ComponentFixture<ControlOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
