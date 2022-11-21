import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';

import { MyOrdersComponent } from './my-orders.component';

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrdersComponent ],
      providers: [
        { provide: AuthQuery, useClass: AuthQueryMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class AuthQueryMock {
  getLoggedInUser(): Observable<User | undefined>{
    const user: User = {
      _id: '1',
      email: 'dsadsa@gmail.com',
      isAdmin: false,
      lastname: 'dsa',
      name: 'rew',
      ordersId: [],
      password: '321',
      phone: 543543543,
      shippingAdress: {
        city: 'dsa',
        streetName: 'rew',
        streetNumber: '1',
        zipCode: '4'
      }
    }
    return of(user)
  }

  isLoggedInUser(): Observable<boolean>{
    return of(true);
  }
}
