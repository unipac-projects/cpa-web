import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertSkaleDetaisComponent } from './likert-skale-detais.component';

describe('LikertSkaleDetaisComponent', () => {
  let component: LikertSkaleDetaisComponent;
  let fixture: ComponentFixture<LikertSkaleDetaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikertSkaleDetaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikertSkaleDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
