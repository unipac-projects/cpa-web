import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsDetailsComponent } from './periods-details.component';

describe('PeriodsDetailsComponent', () => {
  let component: PeriodsDetailsComponent;
  let fixture: ComponentFixture<PeriodsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
