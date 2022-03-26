import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderNavComponent } from './main-header-nav.component';

describe('MainHeaderNavComponent', () => {
  let component: MainHeaderNavComponent;
  let fixture: ComponentFixture<MainHeaderNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHeaderNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
