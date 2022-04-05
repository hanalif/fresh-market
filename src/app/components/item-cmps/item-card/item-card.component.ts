import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item/item.model';
import { ItemUnit } from 'src/app/models/item/itemUnit.model';
import { ItemUnitType } from 'src/app/models/item/itemUnitType.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  ItemUnitType = ItemUnitType

  constructor() { }

  ngOnInit(): void {
  }

  getUnitName(unit: ItemUnitType) {
    switch(unit) {
      case ItemUnitType.KG:
        return 'Kg';
      case ItemUnitType.SINGLE:
        return 'Single';
      case ItemUnitType.PACKAGE:
        return 'Package';
    }
  }

}
