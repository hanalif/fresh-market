import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, switchMap} from 'rxjs';
import { Order } from 'src/app/shared/models/order/order.model';
import { User } from '../../auth/models/user.model';
import { AuthQuery } from '../../auth/state/auth-state/authQuery';
import { OrderService } from '../services/order.service';



@Injectable({ providedIn: 'root' })
export class PersonalAreaUserOrderResolver implements Resolve<Order[]> {
  constructor(private orderService: OrderService, private authQuery: AuthQuery) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Order[] | Observable<Order[]> | Promise<Order[]> {
      const loggedInUser = this.authQuery.getValue().loggedInUser as User;
      return this.orderService.findUserOrders(loggedInUser.ordersId, loggedInUser._id)
  }
}
