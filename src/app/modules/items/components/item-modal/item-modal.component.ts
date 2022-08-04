import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ItemCardMode } from 'src/app/modules/items-shared-module/components/item-card/item-card-mode.enum';
import { ItemUnitsValue } from 'src/app/modules/items-shared-module/models/itemUnitsValue.model';
import { CartService } from 'src/app/services/cart.service';
import { ItemOrderInfo } from 'src/app/shared/models/order/itemOrderInfo.model';
import { CartQuery } from 'src/app/state/cart/cartQuery';
import { ItemModalData } from './models/data.model';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemModalComponent implements OnInit, OnDestroy {
  @Output() itemUnitsValueChanged = new EventEmitter<ItemUnitsValue>()
  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>
  itemOrderInfoSubscription!: Subscription;
  ItemCardMode = ItemCardMode;


  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemModalData,  public dialogRef: MatDialogRef<ItemModalComponent>,  private cartQuery:CartQuery, private cartService:CartService) { }


  ngOnInit(): void {
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();
  }

  onNoClick(): void{
    this.dialogRef.close();
  }


  saveItemUnitsValue(itemOrderInfo: ItemOrderInfo){
    this.itemOrderInfoSubscription = this.cartService.saveItemOrderInfo(itemOrderInfo).subscribe()
  }

  ngOnDestroy(): void {
    this.itemOrderInfoSubscription?.unsubscribe()
  }

}
