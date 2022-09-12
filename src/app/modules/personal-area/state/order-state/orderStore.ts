import { Injectable } from "@angular/core";
import { ActiveState, EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Order } from "src/app/shared/models/order/order.model";




export interface OrderState extends EntityState<Order, string>, ActiveState  {}



@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'order', idKey: '_id' })
export class OrderStore extends EntityStore<OrderState> {

  constructor() {
    super();
  }
}


