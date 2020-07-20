import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompletedtaskComponent } from './admin-completedtask.component';

describe('AdminCompletedtaskComponent', () => {
  let component: AdminCompletedtaskComponent;
  let fixture: ComponentFixture<AdminCompletedtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompletedtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompletedtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
