import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item } from '../../models/item.model';
import {MatDialog } from '@angular/material/dialog';
import { ItemUnitsValue } from '../../models/itemUnitsValue.model';
import { ItemOrderInfo } from 'src/app/shared/models/order/itemOrderInfo.model';
import { ItemModalComponent } from 'src/app/modules/items/components/item-modal/item-modal.component';
import { ItemCardMode } from './item-card-mode.enum';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { ItemUnit } from 'src/app/modules/items/models/itemUnit.model';
import { ItemModalData } from 'src/app/modules/items/components/item-modal/models/data.model';
import { ItemUnitType } from 'src/app/modules/items/models/itemUnitType.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item!: Item;
  @Input() itemUnitsValue!: ItemUnitsValue;
  @Input() displayMode!: ItemCardMode;
  @Output() onSaveItemOrderInfo = new  EventEmitter<ItemOrderInfo>();
  ItemCardMode = ItemCardMode;
  removeItemSubscription$!: Subscription;



  constructor(public dialog: MatDialog, private cartService: CartService, private _snackBar: MatSnackBar,) { }

  ngOnChanges(changes: SimpleChanges): void {
  }


  ngOnInit(): void {
  }

  openDialog() {
    const data: ItemModalData = {
      item: this.item,
      itemUnitsValue: this.itemUnitsValue

    };
    this.dialog.open(ItemModalComponent, {
      data: data,
    });
  }

  saveItemUnitsValue(value: ItemUnitsValue){
    const itemUnitType: ItemUnitType = value.unitType
    const unit = this.item.units.find(unit=> unit.unitType === itemUnitType) as ItemUnit;
    let itemOrderInfo: ItemOrderInfo = {
      _id: this.item._id,
      unitType: itemUnitType,
      amount: value.amount,
      price: unit.price
    }

    this.onSaveItemOrderInfo.emit(itemOrderInfo);
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
