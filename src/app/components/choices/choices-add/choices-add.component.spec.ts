import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesAddComponent } from './choices-add.component';

describe('ChoicesAddComponent', () => {
  let component: ChoicesAddComponent;
  let fixture: ComponentFixture<ChoicesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
