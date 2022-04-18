import { Injectable } from "@angular/core";
import { ActiveState, EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { ItemOrderInfo } from "src/app/shared/models/itemOrderInfo.model";

export interface CartState extends EntityState<ItemOrderInfo, string>, ActiveState  {}

@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'cart', idKey: '_id' })
export class CartStore extends EntityStore<CartState> {

  constructor() {
    super();
  }
}
