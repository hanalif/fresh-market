import { ItemOrderInfo } from "src/app/shared/models/order/itemOrderInfo.model";
import { Item } from "../../items-shared-module/models/item.model";

export interface OrderDetailsToDisplay {
  item: Item,
  itemOrderInfo: ItemOrderInfo
}
