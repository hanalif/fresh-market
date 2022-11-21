import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinusPlusInputComponent } from './minus-plus-input.component';

describe('MinusPlusInputComponent', () => {
  let component: MinusPlusInputComponent;
  let fixture: ComponentFixture<MinusPlusInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinusPlusInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinusPlusInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add 1 to counter when plus is clicked', () => {
    component.registerOnChange(() => {});
    component.onPlus();
    expect(component.counter).toBe(1);
  });
});
