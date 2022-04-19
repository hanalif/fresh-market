import { ItemOrderInfo } from "../itemOrderInfo.model";

export interface OrderItem extends ItemOrderInfo{
  _id: string,
  note: string,
  price: number
}
