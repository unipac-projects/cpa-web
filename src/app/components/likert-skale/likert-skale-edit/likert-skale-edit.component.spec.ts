import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertSkaleEditComponent } from './likert-skale-edit.component';

describe('LikertSkaleEditComponent', () => {
  let component: LikertSkaleEditComponent;
  let fixture: ComponentFixture<LikertSkaleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikertSkaleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikertSkaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
