import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInUserMenuComponent } from './logged-in-user-menu.component';

describe('LoggedInUserMenuComponent', () => {
  let component: LoggedInUserMenuComponent;
  let fixture: ComponentFixture<LoggedInUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInUserMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
