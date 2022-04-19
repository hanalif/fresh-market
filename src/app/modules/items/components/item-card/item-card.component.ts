import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../../models/item.model';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { ItemModalData } from '../item-modal/models/data.model';
import { ItemUnitsValue } from '../../models/itemUnitsValue.model';
import { ItemOrderInfo } from 'src/app/shared/models/itemOrderInfo.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() item!: Item;
  @Input() itemUnitsValue!: ItemUnitsValue;
  itemOrderInfoSubscription!: Subscription;


  constructor(public dialog: MatDialog, private cartService: CartService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }


  ngOnInit(): void {
  }

  openDialog() {
    const data: ItemModalData = {
      item: this.item,
    };
    this.dialog.open(ItemModalComponent, {
      data: data,
    });
  }

  saveItemUnitsValue(value: ItemUnitsValue){
    let itemOrderInfo: ItemOrderInfo = {
      _id: this.item._id,
      unitType: value.unitType,
      amount: value.amount,
    }

    this.itemOrderInfoSubscription = this.cartService.saveItemOrderInfo(itemOrderInfo).subscribe()
  }

  ngOnDestroy(): void {
    this.itemOrderInfoSubscription?.unsubscribe()
  }


}
