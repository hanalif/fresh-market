import { OrderDetailsToDisplay } from "./orderDetailToDisplay.model";

export interface OrderDetailsInput {
  orderDetailsToDisplay: OrderDetailsToDisplay[],
  orderTotalPrice: number
}
