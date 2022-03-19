import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Item } from "src/app/models/item/item.model";
import { ItemService } from "../item.service";


@Injectable({providedIn: 'root'})
export class ItemsListResolver implements Resolve<Item[]>{
  constructor(private itemService: ItemService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Item[] | Observable<Item[]> | Promise<Item[]> {
    const mainCtegoryId = route.params['mainCategoryId']
    const subcategoryId = route.params['subcategoryId']? route.params['subcategoryId'] : '';
    return this.itemService.getItems(mainCtegoryId, subcategoryId);
  }
}
