import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { Item } from "src/app/models/item/item.model";
import { ItemState, ItemStore } from "./itemStore";
import { combineQueries } from '@datorama/akita';
import { UIQuery } from "../UI/UIQuery";

@Injectable({providedIn: 'root'})
export class ItemQuery extends Query<ItemState>{
  constructor(private itemStore: ItemStore, private uiQuery: UIQuery){
    super(itemStore)
  }


  getItemsToShow(): Observable<Item[]>{
    return this.select<Item[]>(state => state.itemsToShow);
  }

  getMainCategoryName(): Observable<string>{
    return this.select<string>(state => state.mainCategoryName);
  }

  getSubCategoryName(): Observable<string>{
    return this.select<string>(state => state.subCategoryName);
  }
}
