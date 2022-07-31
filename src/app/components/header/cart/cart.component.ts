import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { UserQuery } from 'src/app/modules/auth/state/user-state/userQuery';
import { ItemCardMode } from 'src/app/modules/items-shared.module.ts/components/item-card/item-card-mode.enum';
import { Item } from 'src/app/modules/items-shared.module.ts/models/item.model';
import { ItemUnitsValue } from 'src/app/modules/items-shared.module.ts/models/itemUnitsValue.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
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
      private userQuery: UserQuery,
      private cartService: CartService) { }

  cartItemsToShow$! :Observable<Item[]>
  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>
  cartTotalPrice$! :Observable<number>
  itemOrderInfoSubscription!: Subscription;
  ItemCardMode = ItemCardMode;
  emptyCartSubscription!: Subscription;
  loggedInUserName$!: Observable<string | undefined>;


  ngOnInit(): void {
    this.cartItemsToShow$ = this.itemQuery.getItemsToShowInCart();
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();
    this.cartTotalPrice$ = this.cartQuery.getTotalPrice();
    this.loggedInUserName$ = this.userQuery.getLoggedInUser().pipe(
      map(user=> user?.name)
    )

  }

  onCloseCart(val: boolean){
    this.uIService.setIsCartOpen(val);
  }

  onEmptyCart(){
    this.emptyCartSubscription = this.cartService.emptyCart().subscribe()
  }

  saveItemUnitsValue(itemOrderInfo: ItemOrderInfo){
    this.itemOrderInfoSubscription = this.cartService.saveItemOrderInfo(itemOrderInfo).subscribe()
  }

  onCeckOut(){

  }

  ngOnDestroy(): void {
    this.itemOrderInfoSubscription?.unsubscribe();
    this.emptyCartSubscription?.unsubscribe();
  }

}
