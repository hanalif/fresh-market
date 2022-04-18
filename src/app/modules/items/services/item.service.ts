import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { ItemOrderInfo } from "src/app/shared/models/itemOrderInfo.model";
import { Item } from "../models/item.model";
import { ItemQuery } from "../state/itemQuery";
import { ItemStore } from "../state/itemStore";

@Injectable({providedIn: 'root'})

export class ItemService{
  constructor(private http: HttpClient, private itemStore: ItemStore, private itemQuery: ItemQuery){}

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

  saveToItemsToShowInCart(itemOrderInfo: ItemOrderInfo){
      return this.itemQuery.getItemsToShowInCart().pipe(
        switchMap(itemsToShowInCart => {
          const isItemInList = itemsToShowInCart.find(item=> item._id === itemOrderInfo._id);
          if(!isItemInList){
             return this.itemQuery.getItemsToShow().pipe(
              tap(itemsToShow=>{
                const itemToSave = itemsToShow.find(item=> item._id === itemOrderInfo._id);
                const updatedCartItems = [...itemsToShowInCart, itemToSave as Item ];
                this.itemStore.update(state=>{
                  return {
                    ...state,
                    itemsToShowInCart: updatedCartItems
                  }
                })
              })
            )
          } else {
            return EMPTY;
          }
        })
      )
  }

  saveToItemsToShowInCartFromStorage(ItemsIds: string[]){
    return this.http.get<Item[]>('assets/_json-files/items-en.json').pipe(
      tap(items=>{
        const itemsToShowInCartFromStorage = items.filter(item=> ItemsIds.includes(item._id));
        this.itemStore.update(state=>{
          return {
            ...state,
            itemsToShowInCart: itemsToShowInCartFromStorage
          }
        })
      })
    )
  }






}
