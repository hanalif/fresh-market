import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/modules/items/models/item.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { UIService } from 'src/app/services/UI.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(private uIService:UIService, private itemQuery: ItemQuery, private cartService: CartService) { }

  cartItemsToShow$! :Observable<Item[]>
  removeItemSubscription$!: Subscription;

  ngOnInit(): void {
    this.cartItemsToShow$ = this.itemQuery.getItemsToShowInCart();
  }

  onCloseCart(val: boolean){
    this.uIService.setIsCartOpen(val);
  }

  onRemoveItem(itemId: string){
    this.removeItemSubscription$ = this.cartService.removeItemOrderInfo(itemId).subscribe();
  }

  ngOnDestroy(): void {
    if(!this.removeItemSubscription$){
      return;
    }
    this.removeItemSubscription$.unsubscribe();
  }

}
