
export interface user{
  id: string,
  fullname: string,
  isAdmin: boolean,
  username: string,
  password: string,
  email: string,
  phone: number,
  ordersId?: string[]
}
