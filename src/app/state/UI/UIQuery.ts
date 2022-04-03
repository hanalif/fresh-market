import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { ItemCategory } from "src/app/models/item/itemCategory.model";

import { UIState, UIStore } from "./UIStore";

@Injectable({providedIn: 'root'})
export class UIQuery extends Query<UIState>{
  constructor(private uIStore: UIStore){
    super(uIStore)
  }


  setIsMenuMobileOpen(): Observable<boolean>{
    return this.select<boolean>(state => state.isMobileMenuOpen);
  }

  getItemsCategories(): Observable<ItemCategory[]>{
    return this.select<ItemCategory[]>(state=> state.itemsCategories);
  }


}
