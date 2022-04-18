import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ItemOrderInfo } from "src/app/shared/models/itemOrderInfo.model";
import { CartState, CartStore } from "./cartStore";

@Injectable({providedIn: 'root'})
export class CartQuery extends QueryEntity<CartState, ItemOrderInfo> {

  constructor(protected cartStore: CartStore) {
    super(cartStore);
  }

  getItemsOrderInfo() {
    return this.selectAll();
  }

}
