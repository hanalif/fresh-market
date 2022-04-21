import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ItemCardMode } from 'src/app/modules/items-shared.module.ts/components/item-card/item-card-mode.enum';
import { CategoriesTitles } from 'src/app/modules/items/models/categoriesTitles.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { ItemOrderInfo } from 'src/app/shared/models/itemOrderInfo.model';
import { CartQuery } from 'src/app/state/cart/cartQuery';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { Item } from '../../../items-shared.module.ts/models/item.model';
import { ItemUnitsValue } from '../../../items-shared.module.ts/models/itemUnitsValue.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent implements OnInit, OnDestroy{
  public itemsToShow!: Item[];
  items$!: Observable<Item[]>;
  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>
  categoriesTitles$!: Observable<CategoriesTitles>;
  itemOrderInfoSubscription!: Subscription;
  ItemCardMode = ItemCardMode;


  constructor(private itemQuery: ItemQuery, private cartService: CartService, private cartQuery: CartQuery, private uiQuery: UIQuery, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.items$ = this.itemQuery.getItemsToShow();
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();

    this.categoriesTitles$ = this.route.params.pipe(
      switchMap(params=> this.uiQuery.getItemsCategoriesTitles(params['mainCategoryId'], params['subcategoryId'])));
  }

  trackBy(index: number, item: Item) {
    return item._id;
  }

  saveItemUnitsValue(itemOrderInfo: ItemOrderInfo){
    this.itemOrderInfoSubscription = this.cartService.saveItemOrderInfo(itemOrderInfo).subscribe()
  }

  ngOnDestroy(): void {
    this.itemOrderInfoSubscription?.unsubscribe()
  }

}
