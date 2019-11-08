import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesDetailsComponent } from './choices-details.component';

describe('ChoicesDetailsComponent', () => {
  let component: ChoicesDetailsComponent;
  let fixture: ComponentFixture<ChoicesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
