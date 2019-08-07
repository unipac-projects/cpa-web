import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesAddComponent } from './disciplines-add.component';

describe('DisciplinesAddComponent', () => {
  let component: DisciplinesAddComponent;
  let fixture: ComponentFixture<DisciplinesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
