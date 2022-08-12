import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { ItemService } from "../modules/items/services/item.service";
import { ItemOrderInfo } from "../shared/models/order/itemOrderInfo.model";
import { CartStore } from "../state/cart/cartStore";
import { StorageService } from "./async-storag.service";

@Injectable({providedIn: 'root'})

export class CartService{
  private readonly entityType: string = 'items';

  constructor(private storageService: StorageService, private itemService: ItemService, private cartStore: CartStore ){}

  saveItemOrderInfo(itemOrderInfo: ItemOrderInfo){
    return this.storageService.get(this.entityType).pipe(
      switchMap(itemsOrderInfo=>{
        let setItemOrderInfoToStorage$: Observable<void>;
        const isItemInList = itemsOrderInfo.find(ioi=> ioi._id === itemOrderInfo._id);
        if(!isItemInList){
          this.itemService.saveToItemsToShowInCart(itemOrderInfo);
          this.cartStore.add(itemOrderInfo);
          setItemOrderInfoToStorage$ = this.storageService.post(this.entityType, itemOrderInfo);
        } else{
          if(itemOrderInfo.amount === 0){
            this.itemService.removeItemFromItemsToShowInCart(itemOrderInfo._id);
            this.cartStore.remove(itemOrderInfo._id);
            setItemOrderInfoToStorage$ = this.storageService.remove(this.entityType, itemOrderInfo._id);
          } else{
            this.cartStore.update(itemOrderInfo._id, {...itemOrderInfo});
            setItemOrderInfoToStorage$ = this.storageService.put(this.entityType, itemOrderInfo);
          }
        }
        return setItemOrderInfoToStorage$;
      })
    )
  }

  removeItemOrderInfo(itemId: string){
    return this.storageService.get(this.entityType).pipe(
      switchMap(itemsOrderInfo=>{
        this.itemService.removeItemFromItemsToShowInCart(itemId);
        let removeItemOrderInfoFromStorage$: Observable<void>;
        const index = itemsOrderInfo.findIndex(ioi=> ioi._id === itemId);
        itemsOrderInfo.splice(index,1);
        removeItemOrderInfoFromStorage$ = this.storageService.remove(this.entityType, itemId);
        this.cartStore.remove(itemId);
        return removeItemOrderInfoFromStorage$;
      })
    )
  }

  loadItemsOrderInfoFromStorage(){
    return this.storageService.get(this.entityType).pipe(
      switchMap(itemsFromStorage=>{
        const itemsOrderInfo = itemsFromStorage as ItemOrderInfo[]
        const ids = itemsOrderInfo.map(ioi=> ioi._id);
        this.cartStore.add(itemsOrderInfo);
        return this.itemService.saveToItemsToShowInCartFromStorage(ids);
      })
    );
  }

  emptyCart(){
    return this.storageService.removeLocalStorageSessions(this.entityType).pipe(
      map(massage=>{
        this.itemService.removeAllItemsFromItemsToShowInCart();
        this.cartStore.remove();
      })
    )
  }







}

