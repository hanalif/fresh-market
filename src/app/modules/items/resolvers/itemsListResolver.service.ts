import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Item } from "../../items-shared.module.ts/models/item.model";
import { ItemService } from "../services/item.service";


@Injectable({providedIn: 'root'})
export class ItemsListResolver implements Resolve<Item[]>{
  constructor(private itemService: ItemService){}

  resolve(route: ActivatedRouteSnapshot): Item[] | Observable<Item[]> | Promise<Item[]> {
    const mainCtegoryId = route.params['mainCategoryId']
    const subcategoryId = route.params['subcategoryId'] ? route.params['subcategoryId'] : null;
    if(mainCtegoryId == null){
      return this.itemService.getRandItems();

    }

    return this.itemService.getItems(mainCtegoryId, subcategoryId);
  }
}
