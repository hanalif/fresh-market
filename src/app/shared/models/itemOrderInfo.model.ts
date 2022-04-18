import { Entity } from "./entity.model";

export interface ItemOrderInfo extends Entity {
  unitType: string,
  amount: number
}
