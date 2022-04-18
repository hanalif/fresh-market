import { Injectable } from "@angular/core";
import { first, forkJoin, merge, mergeWith, Observable, switchMap, tap } from "rxjs";
import { ItemService } from "../modules/items/services/item.service";
import { ItemQuery } from "../modules/items/state/itemQuery";
import { ItemOrderInfo } from "../shared/models/itemOrderInfo.model";
import { CartQuery } from "../state/cart/cartQuery";
import { CartStore } from "../state/cart/cartStore";
import { StorageService } from "./async-storag.service";

@Injectable({providedIn: 'root'})
export class CartService{
  private readonly entityType: string = 'items';

  constructor(private storageService: StorageService, private itemQuery:ItemQuery, private itemService: ItemService, private cartQuery: CartQuery, private cartStore: CartStore ){}

  saveItemOrderInfo(itemOrderInfo: ItemOrderInfo){
    return this.cartQuery.getItemsOrderInfo().pipe(
      first(),
      switchMap(itemsOrderInfo=>{
        const setItemOrderInfoToItemsStore$ = this.itemService.saveToItemsToShowInCart(itemOrderInfo);
        let setItemOrderInfoToStorage$: Observable<void>;
        const isItemInList = itemsOrderInfo.find(ioi=> ioi._id === itemOrderInfo._id);
        if(!isItemInList){
          this.cartStore.add(itemOrderInfo);
          setItemOrderInfoToStorage$ = this.storageService.post(this.entityType, itemOrderInfo);
        } else{
          this.cartStore.update(itemOrderInfo._id, {...itemOrderInfo});
          setItemOrderInfoToStorage$ = this.storageService.put(this.entityType, itemOrderInfo);
        }
        return forkJoin([setItemOrderInfoToStorage$, setItemOrderInfoToItemsStore$ ])
      })
    )
  }




}

