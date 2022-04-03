import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Item } from "src/app/models/item/item.model";
import { ItemService } from "../item.service";


@Injectable({providedIn: 'root'})
export class ItemsListResolver implements Resolve<Item[]>{
  constructor(private itemService: ItemService){}

  resolve(route: ActivatedRouteSnapshot): Item[] | Observable<any> | Promise<any> {
    const mainCtegoryId = route.params['mainCategoryId']
    const subcategoryId = route.params['subcategoryId'] ? route.params['subcategoryId'] : null;

    return this.itemService.getItems(mainCtegoryId, subcategoryId);
  }
}
