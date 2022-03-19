import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Item } from "../models/item/item.model";
import { ItemStore } from "../state/items/itemStore";

@Injectable({providedIn: 'root'})

export class ItemService{
  constructor(private http: HttpClient, private itemStore: ItemStore){}

  getItems(mainCtegoryId: string, subcategoryId: string): Observable<Item[]> {
    return this.http.get<Item[]>('assets/_json-files/items-en.json').pipe(
      tap(fetchedItems => {
        let itemsToShow: Item[] = fetchedItems.filter(item =>
            item.mainCategoryId === mainCtegoryId &&
            (subcategoryId == null || item.subCategoryId === subcategoryId)
        );

        this.itemStore.update(state => {
          return {
            ...state,
            itemsToShow: itemsToShow
          }
        })
      }),
    );
  }
}
