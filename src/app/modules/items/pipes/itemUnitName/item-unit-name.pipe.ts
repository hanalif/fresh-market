import { Pipe, PipeTransform } from '@angular/core';
import { ItemUnitType } from 'src/app/models/item/itemUnitType.model';

@Pipe({
  name: 'itemUnitName'
})
export class ItemUnitNamePipe implements PipeTransform {
  ItemUnitType = ItemUnitType

  transform(unitType: ItemUnitType): string {
    switch(unitType) {
      case ItemUnitType.KG:
        return 'Kg';
      case ItemUnitType.SINGLE:
        return 'Single';
      case ItemUnitType.PACKAGE:
        return 'Package';
    }
  }
}
