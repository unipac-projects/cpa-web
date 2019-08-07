import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsAddComponent } from './professors-add.component';

describe('ProfessorsAddComponent', () => {
  let component: ProfessorsAddComponent;
  let fixture: ComponentFixture<ProfessorsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
