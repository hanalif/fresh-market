
import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { combineLatestWith, map, tap } from "rxjs";
import { ItemUnitsValue } from "src/app/modules/items-shared-module/models/itemUnitsValue.model";
import { ItemUnit } from "src/app/modules/items/models/itemUnit.model";
import { ItemQuery } from "src/app/modules/items/state/itemQuery";
import { ItemOrderInfo } from "src/app/shared/models/order/itemOrderInfo.model";
import { itemUnitsMap } from "src/app/shared/models/itemUnitMap.model";
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
        const hashMap: itemUnitsMap = {};
        for(let i = 0; i < cartItems.length; i++) {
          let itemOrderInfo = cartItems[i];
          hashMap[itemOrderInfo._id] = { amount: itemOrderInfo.amount, unitType: itemOrderInfo.unitType};
        }
        return hashMap;
      })
    );
  }

  getTotalPrice() {
    return this.getCartItemUnitsMap().pipe(
      combineLatestWith(this.itemQuery.getItemsToShowInCart()),
      map(([hashMap, itemsInCart])=>{
        let totalPrice: number = 0;
        for(let item of itemsInCart){
          const itemOrderDetails = hashMap[item._id]
          const currItemAmount = itemOrderDetails.amount
          const unitPrice = item.units.find(ut => ut.unitType === itemOrderDetails.unitType)!.price;
          const currItemTotalPrice = currItemAmount * unitPrice;
          totalPrice += currItemTotalPrice
        }
        return totalPrice;
      })
      )
    }


  }

