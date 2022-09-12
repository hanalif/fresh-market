import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable} from 'rxjs';
import { Item } from '../../items-shared-module/models/item.model';
import { ItemService } from '../../items/services/item.service';
import { OrderDetailsToDisplay } from '../models/orderDetailToDisplay.model';
import { OrderQuery } from '../state/order-state/orderQuery';
import { map, tap } from "rxjs/operators";
import { ItemOrderInfo } from 'src/app/shared/models/order/itemOrderInfo.model';
import { OrderDetailsInput } from '../models/orderDetailsInput.model';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/shared/models/order/order.model';


@Injectable({ providedIn: 'root' })
export class PersonalAreaOrderDetailResolver implements Resolve<OrderDetailsInput> {
  constructor(private orderQuery: OrderQuery, private itemService: ItemService, private orderService: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): OrderDetailsInput | Observable<OrderDetailsInput> | Promise<OrderDetailsInput> {

    const orderId = route.paramMap.get('orderId');

    let order = this.orderQuery.getEntity(orderId as string) as Order;

    let orderItems = order?.items as ItemOrderInfo[];

    let itemsIds = orderItems?.map(orderItem=> orderItem._id) as string[];

    let updatedOrder = {...order, isRead: true} as Order;

    const saveUpdatedOrder$ = this.orderService.updateOrder(updatedOrder)

    const orderDetailsInput$ = this.itemService.getItemsByIds(itemsIds).pipe(
      map(items=>{
        let orderItemDetailsToDisplay = orderItems?.map(orderItem => {
          let orderDetailsToDisplay: OrderDetailsToDisplay = {
            item: items.find(item=> item._id === orderItem._id) as Item,
            itemOrderInfo: orderItem,
          }
          return orderDetailsToDisplay
        })

        let orderDetailsInput :OrderDetailsInput = {
          orderDetailsToDisplay: orderItemDetailsToDisplay,
          orderTotalPrice: order?.totalPrice as number,
        }
        return orderDetailsInput;
      })
    )

    return forkJoin([saveUpdatedOrder$, orderDetailsInput$]).pipe(
      map(([a,b]) => b)
    ) ;
  }

}
