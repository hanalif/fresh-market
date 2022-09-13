import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, Observable, ReplaySubject, Subscription, switchMap, takeUntil } from 'rxjs';
import { UserMenuModalComponent } from 'src/app/modules/auth/components/user-menu-modal/user-menu-modal.component';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
import { UserQuery } from 'src/app/modules/auth/state/user-state/userQuery';
import { ItemCardMode } from 'src/app/modules/items-shared-module/components/item-card/item-card-mode.enum';
import { Item } from 'src/app/modules/items-shared-module/models/item.model';
import { ItemUnitsValue } from 'src/app/modules/items-shared-module/models/itemUnitsValue.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { UIService } from 'src/app/services/UI.service';
import { ItemOrderInfo } from 'src/app/shared/models/order/itemOrderInfo.model';

import { CartQuery } from 'src/app/state/cart/cartQuery';
import { OrderConfirmationComponent } from '../../order-confirmation/order-confirmation.component';
import { OrderConfirmationDialogData } from '../../order-confirmation/orderConfirmationDialogData.model';


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
      private cartService: CartService,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog) { }

  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>

  cartItemsToShow$! :Observable<Item[]>
  cartTotalPrice!: number;
  ItemCardMode = ItemCardMode;
  loggedInUser: User | undefined;
  cartItemsToShow!: Item[];


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
    if(this.loggedInUser){
      let orderConfirmationData: OrderConfirmationDialogData = {
        itemsOrderInfo: this.cartQuery.getAll(),
        totalPrice: this.cartTotalPrice,
        user: this.loggedInUser
      }
      this.dialog.open(OrderConfirmationComponent, { data: orderConfirmationData});
    }else{
      let snackBarRef = this._snackBar.open('Please Log In Or Sign Up First!', 'OK' ,{panelClass: ['snackbar-style']} );
      snackBarRef.afterDismissed().subscribe(() => {
        this.dialog.open(UserMenuModalComponent)
      });

    }
  }



  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }



}
