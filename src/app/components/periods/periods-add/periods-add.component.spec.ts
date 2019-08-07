import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsAddComponent } from './periods-add.component';

describe('PeriodsAddComponent', () => {
  let component: PeriodsAddComponent;
  let fixture: ComponentFixture<PeriodsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
