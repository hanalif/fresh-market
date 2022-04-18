import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/modules/items/models/item.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  constructor(private uIService:UIService, private itemQuery: ItemQuery) { }
  cartItemsToShow$! :Observable<Item[]>

  ngOnInit(): void {
    this.cartItemsToShow$ = this.itemQuery.getItemsToShowInCart();
  }

  onCloseCart(val: boolean){
    this.uIService.setIsCartOpen(val);
  }

}
