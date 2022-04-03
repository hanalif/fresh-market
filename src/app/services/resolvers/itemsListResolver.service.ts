import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { filter, Observable, Subscription, switchMap, tap } from "rxjs";
import { Item } from "src/app/models/item/item.model";
import { UIQuery } from "src/app/state/UI/UIQuery";
import { ItemService } from "../item.service";


@Injectable({providedIn: 'root'})
export class ItemsListResolver implements Resolve<Item[]>{
  constructor(private itemService: ItemService, private uiQuery: UIQuery){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Item[] | Observable<Item[]> | Promise<Item[]> {
    const mainCtegoryId = route.params['mainCategoryId']
    const subcategoryId = route.params['subcategoryId'] ? route.params['subcategoryId'] : null;
    return this.itemService.getItems(mainCtegoryId, subcategoryId);
  }
}
