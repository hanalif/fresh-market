
import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map } from "rxjs";
import { ItemUnitsValue } from "src/app/modules/items-shared.module.ts/models/itemUnitsValue.model";
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

  getCartItemUnitsMap(){
    return this.getItemsOrderInfo().pipe(
      map(cartItems => {
        const hashMap: { [id: string] : ItemUnitsValue } = {};
        for(let i = 0; i < cartItems.length; i++) {
          let itemOrderInfo = cartItems[i];
          hashMap[itemOrderInfo._id] = { amount: itemOrderInfo.amount, unitType: itemOrderInfo.unitType };
        }
        return hashMap;
      })
    );
  }
}
