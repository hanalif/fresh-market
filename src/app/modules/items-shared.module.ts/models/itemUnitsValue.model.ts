import { ItemUnitType } from "../../items/models/itemUnitType.model";

export interface ItemUnitsValue {
  unitType: ItemUnitType,
  amount: number,
  price?: number
}
