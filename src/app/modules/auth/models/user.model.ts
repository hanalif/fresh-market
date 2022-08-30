import { Entity } from "src/app/shared/models/entity.model";
import { ShippingAdress } from "./shippingAdress.model";

export interface User extends Entity{
  name: string,
  lastname: string,
  isAdmin: boolean,
  password: string,
  email: string,
  phone: number,
  ordersId: string[],
  shippingAdress?: ShippingAdress
}
