import { ItemOrderInfo } from "./itemOrderInfo.model"
import { OrderStatus } from "./orderStatus.model"


export interface Order{
  _id: string,
  createdAt: Date,
  totalPrice: number,
  items: ItemOrderInfo[],
  buyerId: string,
  status: OrderStatus
}
