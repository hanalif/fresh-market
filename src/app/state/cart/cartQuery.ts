
import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map, tap } from "rxjs";
import { ItemUnitsValue } from "src/app/modules/items-shared.module.ts/models/itemUnitsValue.model";
import { ItemQuery } from "src/app/modules/items/state/itemQuery";
import { ItemOrderInfo } from "src/app/shared/models/itemOrderInfo.model";
import { CartState, CartStore } from "./cartStore";

@Injectable({providedIn: 'root'})
export class CartQuery extends QueryEntity<CartState, ItemOrderInfo> {

  constructor(protected cartStore: CartStore, private itemQuery: ItemQuery) {
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
          hashMap[itemOrderInfo._id] = { amount: itemOrderInfo.amount, unitType: itemOrderInfo.unitType};
        }
        return hashMap;
      })
    );
  }

  getTotalPrice() {
   return this.itemQuery.getItemsToShowInCart().pipe(
    // const unitPrice:ItemUnit | undefined = this.item.units.find(ut => ut.unitType == value.unitType)
     tap((items)=> console.log(items))

    )

  }
}
