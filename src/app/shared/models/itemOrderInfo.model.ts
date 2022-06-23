import { ItemUnitType } from "src/app/modules/items/models/itemUnitType.model";
import { Entity } from "./entity.model";

export interface ItemOrderInfo extends Entity {
  unitType: ItemUnitType,
  amount: number,
  note?: string,
}
