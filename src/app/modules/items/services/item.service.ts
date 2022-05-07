import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ItemOrderInfo } from "src/app/shared/models/itemOrderInfo.model";
import { Item } from "../../items-shared.module.ts/models/item.model";
import { ItemStore } from "../state/itemStore";

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

  getSearchResultItems(searchKey: string){
    if(searchKey === ''){
      return of([])
    }
    return this.http.get<Item[]>('assets/_json-files/items-en.json').pipe(
      map(fetchedItems =>{
        const serchKeyToLowerCase = searchKey.toLocaleLowerCase()
        let updatedFetchedItems = [...fetchedItems.filter(item=> item.name.toLocaleLowerCase().startsWith(serchKeyToLowerCase))]
        return updatedFetchedItems;
      })
    )
  }

  saveToItemsToShowInCart(itemOrderInfo: ItemOrderInfo){
    let updatedItemsToShowInCart = [...this.itemStore._value().itemsToShowInCart];
    const isItemInList = updatedItemsToShowInCart.find(item=> item._id === itemOrderInfo._id);
    if(!isItemInList){
      let itemsToShow = this.itemStore._value().itemsToShow;
      const itemToSave = itemsToShow.find(item=> item._id === itemOrderInfo._id);
      updatedItemsToShowInCart.push(itemToSave as Item);
      this.itemStore.update(state=>{
        return {
          ...state,
          itemsToShowInCart: updatedItemsToShowInCart
        }
      })
    }
  }


  removeItemFromItemsToShowInCart(itemId:string){
    let updatedItemsToShowInCart = [...this.itemStore._value().itemsToShowInCart]
    const index = updatedItemsToShowInCart.findIndex(item=> item._id === itemId);
    updatedItemsToShowInCart.splice(index, 1);
    this.itemStore.update(state=>{
      return {
        ...state,
        itemsToShowInCart: updatedItemsToShowInCart
      }
    })
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
