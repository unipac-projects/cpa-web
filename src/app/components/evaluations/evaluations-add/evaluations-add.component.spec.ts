import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsAddComponent } from './evaluations-add.component';

describe('EvaluationsAddComponent', () => {
  let component: EvaluationsAddComponent;
  let fixture: ComponentFixture<EvaluationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
