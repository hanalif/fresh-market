export interface User{
  _id: string,
  fullname: string,
  username: string,
  password: string,
  email: string,
  cellNumber: number,
  ordersIds: string[]
  isAdmin: boolean,
}
