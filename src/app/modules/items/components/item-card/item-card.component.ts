import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item } from '../../models/item.model';
import {MatDialog } from '@angular/material/dialog';
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
export class ItemCardComponent implements OnInit, OnChanges {
  @Input() item!: Item;
  @Input() itemUnitsValue!: ItemUnitsValue;
  @Output() onSaveItemOrderInfo = new  EventEmitter<ItemOrderInfo>();



  constructor(public dialog: MatDialog) { }
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
    this.onSaveItemOrderInfo.emit(itemOrderInfo);


  }




}
