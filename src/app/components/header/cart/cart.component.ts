import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, Observable, ReplaySubject, Subscription, switchMap, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
import { UserQuery } from 'src/app/modules/auth/state/user-state/userQuery';
import { ItemCardMode } from 'src/app/modules/items-shared-module/components/item-card/item-card-mode.enum';
import { Item } from 'src/app/modules/items-shared-module/models/item.model';
import { ItemUnitsValue } from 'src/app/modules/items-shared-module/models/itemUnitsValue.model';
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
      private cartService: CartService,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog) { }

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
      this._snackBar.open('No Items In Cart', 'OK' ,{panelClass: ['snackbar-style']} )
      return;
    }
    this.onCeckOutClickCount++;
    if (this.onCeckOutClickCount === 1 ){
      if(this.loggedInUser){
        let snackBarRef = this._snackBar.open('Are you sure you want to checkout?', 'OK' ,{panelClass: ['snackbar-style']} );
        let itemsOrderInfo: ItemOrderInfo[];
        itemsOrderInfo = this.cartQuery.getAll();
        let saveNewOrder$ =  this.orderService.saveNewOrder(itemsOrderInfo, this.cartTotalPrice, this.loggedInUser);
        snackBarRef.onAction().pipe(
          takeUntil(this.destroyed$),
          switchMap(res=> saveNewOrder$),
          tap(()=> this.onCeckOutClickCount = 0))
          .subscribe();
      }else{
        this._snackBar.open('Please Log In Or Sign Up First!', 'OK' ,{panelClass: ['snackbar-style']} );
      }
      this.onCeckOutClickCount = 0;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
