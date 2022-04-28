import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ItemCardMode } from 'src/app/modules/items-shared.module.ts/components/item-card/item-card-mode.enum';
import { Item } from 'src/app/modules/items-shared.module.ts/models/item.model';
import { ItemUnitsValue } from 'src/app/modules/items-shared.module.ts/models/itemUnitsValue.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { UIService } from 'src/app/services/UI.service';
import { ItemOrderInfo } from 'src/app/shared/models/itemOrderInfo.model';
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
      private cartService: CartService) { }

  cartItemsToShow$! :Observable<Item[]>
  removeItemSubscription$!: Subscription;
  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>
  itemOrderInfoSubscription!: Subscription;
  ItemCardMode = ItemCardMode;

  ngOnInit(): void {
    this.cartItemsToShow$ = this.itemQuery.getItemsToShowInCart();
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();
  }

  onCloseCart(val: boolean){
    this.uIService.setIsCartOpen(val);
  }

  onRemoveItem(itemId: string){
    this.removeItemSubscription$ = this.cartService.removeItemOrderInfo(itemId).subscribe();
  }

  saveItemUnitsValue(itemOrderInfo: ItemOrderInfo){
    this.itemOrderInfoSubscription = this.cartService.saveItemOrderInfo(itemOrderInfo).subscribe()
  }

  ngOnDestroy(): void {
    if(!this.removeItemSubscription$){
      return;
    }
    this.removeItemSubscription$.unsubscribe();
    this.itemOrderInfoSubscription?.unsubscribe()
  }


}
