import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertSkaleComponent } from './likert-skale.component';

describe('LikertSkaleComponent', () => {
  let component: LikertSkaleComponent;
  let fixture: ComponentFixture<LikertSkaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikertSkaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikertSkaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
