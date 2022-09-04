import { User } from "src/app/modules/auth/models/user.model";
import { ItemOrderInfo } from "src/app/shared/models/order/itemOrderInfo.model";

export interface OrderConfirmationDialogData {
  itemsOrderInfo: ItemOrderInfo[],
  totalPrice: number,
  user: User
}
