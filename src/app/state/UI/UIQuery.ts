import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { map, Observable } from "rxjs";
import { CategoriesTitles } from "src/app/modules/items/models/categoriesTitles.model";
import { ItemCategory } from "src/app/modules/items/models/itemCategory.model";

import { UIState, UIStore } from "./UIStore";

@Injectable({providedIn: 'root'})
export class UIQuery extends Query<UIState>{
  constructor(private uIStore: UIStore){
    super(uIStore)
  }


  setIsMenuMobileOpen(): Observable<boolean>{
    return this.select<boolean>(state => state.isMobileMenuOpen);
  }

  setIsCartOpen(): Observable<boolean>{
    return this.select<boolean>(state=> state.isCartOpen);
  }

  getItemsCategories(): Observable<ItemCategory[]>{
    return this.select<ItemCategory[]>(state=> state.itemsCategories);
  }

  getItemsCategoriesTitles(mainCategoryId:string|undefined, subCategoryId:string|undefined): Observable<CategoriesTitles>{
    return this.getItemsCategories().pipe(
      map(categories=>{
        const itemCategory = categories.find(c => c._id === mainCategoryId)
        const itemSubCategory = itemCategory?.subCategiries.find(sc => sc._id === subCategoryId);
        return{
          mainCategory: itemCategory?.mainCategoryName,
          subCategory: itemSubCategory?.name
          }
      })
    )

  }



}
