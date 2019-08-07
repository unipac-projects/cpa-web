import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesDetailsComponent } from './disciplines-details.component';

describe('DisciplinesDetailsComponent', () => {
  let component: DisciplinesDetailsComponent;
  let fixture: ComponentFixture<DisciplinesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
