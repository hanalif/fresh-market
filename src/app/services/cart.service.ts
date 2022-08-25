import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import { Item } from "../modules/items-shared-module/models/item.model";
import { ItemService } from "../modules/items/services/item.service";
import { OrderDetailsToDisplay } from "../modules/personal-area/models/orderDetailToDisplay.model";
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


  copyItemsOrderInfoToCart(itemsToCopy: OrderDetailsToDisplay[]){
      return this.storageService.get(this.entityType).pipe(
        switchMap(iois =>{
          let setItemOrderInfoToStorage$: Observable<void>;
          const itemsOrderInfoInCart = iois as ItemOrderInfo[];
          let itemsDetailsToAddToCart = itemsToCopy.filter(itc => itemsOrderInfoInCart.find(i => i._id === itc.itemOrderInfo._id) == null);
          const itemsOrderInfoToAddToCart = itemsDetailsToAddToCart.map(i => i.itemOrderInfo);
          const itemsToAddToCart = itemsDetailsToAddToCart.map(i => i.item);

          this.itemService.addManyToItemsToShowInCart(itemsToAddToCart);
          this.cartStore.add(itemsOrderInfoToAddToCart);
          setItemOrderInfoToStorage$ = this.storageService.postMany(this.entityType, itemsOrderInfoToAddToCart);

          return setItemOrderInfoToStorage$
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

