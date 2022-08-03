import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
import { UserQuery } from 'src/app/modules/auth/state/user-state/userQuery';
import { ItemCardMode } from 'src/app/modules/items-shared.module.ts/components/item-card/item-card-mode.enum';
import { Item } from 'src/app/modules/items-shared.module.ts/models/item.model';
import { ItemUnitsValue } from 'src/app/modules/items-shared.module.ts/models/itemUnitsValue.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { OrderService } from 'src/app/modules/personal-area/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { UIService } from 'src/app/services/UI.service';
import { ItemOrderInfo } from 'src/app/shared/models/order/itemOrderInfo.model';

import { CartQuery } from 'src/app/state/cart/cartQuery';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, OnDestroy {


  constructor(
      private uIService:UIService,
      private itemQuery: ItemQuery,
      private cartQuery:CartQuery,
      private authQuery: AuthQuery,
      private orderService: OrderService,
      private cartService: CartService) { }

  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>

  cartItemsToShow$! :Observable<Item[]>
  cartTotalPrice!: number;
  ItemCardMode = ItemCardMode;
  loggedInUser: User | undefined;
  cartItemsToShow!: Item[];

  private onCeckOutClickCount: number = 0;


  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  ngOnInit(): void {
    this.itemQuery.getItemsToShowInCart().pipe(takeUntil(this.destroyed$)).subscribe(items=>{
      this.cartItemsToShow = items;
    });
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();
    this.cartQuery.getTotalPrice().pipe(takeUntil(this.destroyed$)).subscribe(totalPrice=>{
      this.cartTotalPrice = totalPrice;
    });
    this.authQuery.getLoggedInUser().pipe(takeUntil(this.destroyed$)).subscribe(user=>{
        this.loggedInUser = user;
    })

  }

  onCloseCart(val: boolean){
    this.uIService.setIsCartOpen(val);
  }

  onEmptyCart(){
     this.cartService.emptyCart().pipe(takeUntil(this.destroyed$)).subscribe()
  }

  saveItemUnitsValue(itemOrderInfo: ItemOrderInfo){
     this.cartService.saveItemOrderInfo(itemOrderInfo).pipe(takeUntil(this.destroyed$)).subscribe()
  }

  onCeckOut(){
    if(this.cartItemsToShow.length == 0 || this.cartItemsToShow.length == -1){
      console.log('No items in cart!')
      return;
    }

    this.onCeckOutClickCount++;
    if (this.onCeckOutClickCount > 1 ){
      if(this.loggedInUser){
        let itemsOrderInfo: ItemOrderInfo[];
        itemsOrderInfo = this.cartQuery.getAll();
        this.orderService.saveNewOrder(itemsOrderInfo, this.cartTotalPrice, this.loggedInUser).pipe(takeUntil(this.destroyed$)).subscribe();
      }else{
        console.log('Please Log in or sign up first!')
      }
      this.onCeckOutClickCount = 0;
    }else{
      console.log('Are you sure you want to checkout?');
    }


  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
