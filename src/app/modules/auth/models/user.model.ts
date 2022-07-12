import { Entity } from "src/app/shared/models/entity.model";

export interface User extends Entity{
  name: string,
  lastname: string,
  isAdmin: boolean,
  username: string,
  password: string,
  email: string,
  phone: number,
  ordersId?: string[]
}
