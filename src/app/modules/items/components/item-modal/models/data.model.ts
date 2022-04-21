import { ItemUnitsValue } from "src/app/modules/items-shared.module.ts/models/itemUnitsValue.model";
import { Item } from "../../../../items-shared.module.ts/models/item.model";

export interface ItemModalData{
  item: Item,
  itemUnitsValue: ItemUnitsValue

}
