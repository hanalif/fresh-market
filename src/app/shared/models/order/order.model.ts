import { OrderItem } from "./orderItem.model"

export interface Order{
  _id: string,
  createdAt: Date,
  totalPrice: number,
  items: OrderItem[],
  buyerId: string,
  status: string
}
