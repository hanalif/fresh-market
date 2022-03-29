import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ItemCategory } from "../models/item/itemCategory.model";
import { UIStore } from "../state/UI/UIStore";

@Injectable({providedIn: 'root'})

export class UIService{
  constructor(private http: HttpClient, private uIStore: UIStore){}

  setIsMobileMenuOpen(val: boolean){
    this.uIStore.update(state=>{
      return {
        ...state,
        isMobileMenuOpen: val
      }
    })
  }

  getItemsCategories():Observable<ItemCategory[]>{
      return this.http.get<ItemCategory[]>('assets/_json-files/items-categories.json').pipe(
       tap(itemsCategoriesFromJson=>{
          this.uIStore.update(state=> {
            return {
              ...state,
              itemsCategories: itemsCategoriesFromJson
            }
          })
       }),
     );
  }




}
