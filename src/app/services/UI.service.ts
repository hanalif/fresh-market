import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { ItemCategory } from "../modules/items/models/itemCategory.model";
import { UIStore } from "../state/UI/UIStore";

@Injectable({providedIn: 'root'})

export class UIService{
  constructor(private http: HttpClient, private uIStore: UIStore, private route: Router){}

  setIsMobileMenuOpen(val: boolean){
    this.uIStore.update(state=>{
      return {
        ...state,
        isMobileMenuOpen: val
      }
    })
  }

  setIsCartOpen(val: boolean){
    this.uIStore.update(state=>{
      return {
        ...state,
        isCartOpen: val
      }
    })
  }

  setIsSearchBoxOpen(val: boolean){
    this.uIStore.update(state=>{
      return {
        ...state,
        isSearchBoxOpen: val
      }
    })
  }


  setUiStoreAfterBackdropClicked(val: boolean){
    this.uIStore.update(state=>{
      return{
        ...state,
        isCartOpen: val,
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

  updateWhenUrlChangesOccur(){
    return this.route.events.pipe(
      filter(e => e instanceof NavigationStart),
      tap(event=>{
      this.uIStore.update(state=>{
        return{
          ...state,
          isMobileMenuOpen: false
          }
        }
      )
    }))
  }
}
