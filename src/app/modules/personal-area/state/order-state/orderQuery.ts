
import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { tap } from "rxjs";
import { Order } from "../../../../shared/models/order/order.model";
import { OrderState, OrderStore } from "./orderStore";


@Injectable({providedIn: 'root'})
export class OrderQuery extends QueryEntity<OrderState, Order> {

  constructor(protected orderStore: OrderStore) {
    super(orderStore);
  }

  getItemsOrderInfo() {
    return this.selectAll().pipe(
      tap(res=> console.log(res))
    );



  }


  }

