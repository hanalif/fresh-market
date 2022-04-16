import { Injectable } from "@angular/core";
import { ItemOrderInfo } from "../shared/models/itemOrderInfo.model";
import { StorageService } from "./async-storag.service";

@Injectable({providedIn: 'root'})
export class CartService{
  private readonly entityType: string = 'items';

  constructor(private storageService: StorageService ){}

  saveToStorage(itemOrderInfo: ItemOrderInfo){
    return this.storageService.post( this.entityType ,itemOrderInfo)
  }

}
