import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsEditComponent } from './periods-edit.component';

describe('PeriodsEditComponent', () => {
  let component: PeriodsEditComponent;
  let fixture: ComponentFixture<PeriodsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
