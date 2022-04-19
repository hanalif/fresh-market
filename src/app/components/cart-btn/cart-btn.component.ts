import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';

@Component({
  selector: 'app-cart-btn',
  templateUrl: './cart-btn.component.html',
  styleUrls: ['./cart-btn.component.scss']
})
export class CartBtnComponent implements OnInit {
  cartItemsLength$! :Observable<number>;

  constructor(private itemQuery:ItemQuery) { }

  ngOnInit(): void {
    this.cartItemsLength$ = this.itemQuery.getItemsToShowInCart().pipe(
      map(itemsToShowInCart=> itemsToShowInCart.length)
    )
  }

}
