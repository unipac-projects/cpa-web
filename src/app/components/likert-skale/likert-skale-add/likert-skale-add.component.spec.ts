import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertSkaleAddComponent } from './likert-skale-add.component';

describe('LikertSkaleAddComponent', () => {
  let component: LikertSkaleAddComponent;
  let fixture: ComponentFixture<LikertSkaleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikertSkaleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikertSkaleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
