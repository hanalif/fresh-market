import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Item } from "../models/item/item.model";
import { ItemStore } from "../state/items/itemStore";



@Injectable({providedIn: 'root'})

export class ItemService{
  constructor(private http: HttpClient, private itemStore: ItemStore){}

  getItems(mainCtegoryId: string, subcategoryId:string){
    return this.http.get<Item[]>('assets/_json-files/items-en.json').pipe(
      tap(fetchedItems=>{
        let itemsToShow: Item[];
        if(subcategoryId === ''){
          itemsToShow = fetchedItems.filter(item=>{
            return item.mainCategoryId === mainCtegoryId
          })
        }else{
         itemsToShow = fetchedItems.filter(item=>{
            return (item.mainCategoryId === mainCtegoryId && item.subCategoryId === subcategoryId)
          })
        }
        this.itemStore.update(state=>{
          return {
            ...state,
            itemsToShow: itemsToShow
          }
        })
      }),
    );
  }






}
