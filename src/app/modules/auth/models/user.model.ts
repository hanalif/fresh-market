
export interface User {
  _id: string,
  fullname: string,
  isAdmin: boolean,
  username: string,
  password: string,
  email: string,
  phone: number,
  ordersId?: string[]
}
