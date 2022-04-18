import { Injectable } from "@angular/core";
import { switchMap } from "rxjs";
import { ItemService } from "../modules/items/services/item.service";
import { ItemQuery } from "../modules/items/state/itemQuery";
import { ItemOrderInfo } from "../shared/models/itemOrderInfo.model";
import { CartQuery } from "../state/cart/cartQuery";
import { CartStore } from "../state/cart/cartStore";
import { StorageService } from "./async-storag.service";

@Injectable({providedIn: 'root'})
export class CartService{
  private readonly entityType: string = 'items';

  constructor(private storageService: StorageService, private itemService: ItemService, private cartQuery: CartQuery, private cartStore: CartStore ){}

  saveCartItemToStorage(itemOrderInfo: ItemOrderInfo){




  }

}
