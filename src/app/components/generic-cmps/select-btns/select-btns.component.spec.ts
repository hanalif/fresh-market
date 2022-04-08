import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBtnsComponent } from './select-btns.component';

describe('SelectBtnsComponent', () => {
  let component: SelectBtnsComponent;
  let fixture: ComponentFixture<SelectBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBtnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
