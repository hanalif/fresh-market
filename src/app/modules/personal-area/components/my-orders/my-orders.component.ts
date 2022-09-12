import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
import { Order } from 'src/app/shared/models/order/order.model';
import { OrderQuery } from '../../state/order-state/orderQuery';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy  {

  personalOrders!: Order[];
  personalOrdersSubscription!: Subscription;


  constructor( private authQuery: AuthQuery, private orderQuery: OrderQuery) { }

  ngOnInit(): void {
    const personalOrders$ = this.authQuery.getLoggedInUser().pipe(switchMap(user=>{
      let loggedInUser = user as User;
      return this.orderQuery.getUserOrders(loggedInUser.ordersId, loggedInUser._id);
    }))

    this.personalOrdersSubscription = personalOrders$.subscribe(personalOrders=>{
      this.personalOrders = personalOrders
    })




  }

  ngOnDestroy(): void {
      this.personalOrdersSubscription.unsubscribe();
  }
}
