import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuBtnComponent } from './user-menu-btn.component';

describe('UserMenuBtnComponent', () => {
  let component: UserMenuBtnComponent;
  let fixture: ComponentFixture<UserMenuBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMenuBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
