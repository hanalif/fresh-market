
import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { EMPTY, map, of, tap } from "rxjs";
import { Order } from "../../../../shared/models/order/order.model";
import { OrderState, OrderStore } from "./orderStore";


@Injectable({providedIn: 'root'})
export class OrderQuery extends QueryEntity<OrderState, Order> {

  constructor(protected orderStore: OrderStore) {
    super(orderStore);
  }

  getItemsOrderInfo() {
    return this.selectAll();
  }

  getUnreadOrdersForBadge(userId: string | undefined, ordersIds: string[] | undefined){
    if(!userId ){
      return of(0);
    }else{
      return this.getItemsOrderInfo().pipe(map(orders=>{
          const userOrders = orders.filter(order => order.buyerId === userId && ordersIds?.includes(order._id) );
          const unreadOrders: number [] = userOrders.map(order=> order.isRead? 0 : 1);
          const readCount = unreadOrders.reduce((accumulator, currvalue) => {
            return accumulator + currvalue
          }, 0);
          return readCount;
        }

      ))
    }
  }

  getUserOrders(ordersIds: string[], loggedInUserId:string){
    return this.getItemsOrderInfo().pipe(map(orders=>{
      let userOrders = orders.filter(order => order.buyerId === loggedInUserId && ordersIds.includes(order._id) );
      return userOrders;
    }
  ))
  }

  }

