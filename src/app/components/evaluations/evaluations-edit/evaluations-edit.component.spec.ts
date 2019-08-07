import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsEditComponent } from './evaluations-edit.component';

describe('TipoServicosEditComponent', () => {
  let component: EvaluationsEditComponent;
  let fixture: ComponentFixture<EvaluationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
