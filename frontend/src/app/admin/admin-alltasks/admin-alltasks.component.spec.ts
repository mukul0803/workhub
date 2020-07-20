import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlltasksComponent } from './admin-alltasks.component';

describe('AdminAlltasksComponent', () => {
  let component: AdminAlltasksComponent;
  let fixture: ComponentFixture<AdminAlltasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlltasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlltasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
