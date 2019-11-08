import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesEditComponent } from './choices-edit.component';

describe('ChoicesEditComponent', () => {
  let component: ChoicesEditComponent;
  let fixture: ComponentFixture<ChoicesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
