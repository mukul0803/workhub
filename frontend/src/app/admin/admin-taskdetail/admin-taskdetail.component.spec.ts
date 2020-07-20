import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTaskdetailComponent } from './admin-taskdetail.component';

describe('AdminTaskdetailComponent', () => {
  let component: AdminTaskdetailComponent;
  let fixture: ComponentFixture<AdminTaskdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTaskdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTaskdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
