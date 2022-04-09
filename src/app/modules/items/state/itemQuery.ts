import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ItemState, ItemStore } from "./itemStore";


@Injectable({providedIn: 'root'})
export class ItemQuery extends Query<ItemState>{
  constructor(private itemStore: ItemStore){
    super(itemStore)
  }


  getItemsToShow(): Observable<Item[]>{
    return this.select<Item[]>(state => state.itemsToShow);
  }
}