import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingtaskComponent } from './admin-pendingtask.component';

describe('AdminPendingtaskComponent', () => {
  let component: AdminPendingtaskComponent;
  let fixture: ComponentFixture<AdminPendingtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
