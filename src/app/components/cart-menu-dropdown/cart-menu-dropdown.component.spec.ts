import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMenuDropdownComponent } from './cart-menu-dropdown.component';

describe('CartMenuDropdownComponent', () => {
  let component: CartMenuDropdownComponent;
  let fixture: ComponentFixture<CartMenuDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartMenuDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartMenuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
