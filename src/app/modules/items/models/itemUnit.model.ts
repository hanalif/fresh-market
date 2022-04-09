import { ItemUnitType } from "./itemUnitType.model";

export interface ItemUnit {
    unitType: ItemUnitType,
    price: number,
    currency: string
}
