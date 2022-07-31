import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { ItemCardMode } from 'src/app/modules/items-shared.module.ts/components/item-card/item-card-mode.enum';
import { PageTitles } from 'src/app/modules/items/models/categoriesTitles.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { ItemOrderInfo } from 'src/app/shared/models/order/itemOrderInfo.model';
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
  pageTitles$!: Observable<PageTitles>;
  itemOrderInfoSubscription!: Subscription;
  ItemCardMode = ItemCardMode;


  constructor(
        private itemQuery: ItemQuery,
        private cartService: CartService,
        private cartQuery: CartQuery,
        private uiQuery: UIQuery,
        private route: ActivatedRoute,
        private render: Renderer2) {}



  ngOnInit(): void {
    this.items$ = this.itemQuery.getItemsToShow();
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();

    this.pageTitles$ = this.route.params.pipe(
      switchMap(params=>
            {
              const mainCategoryId = params['mainCategoryId'];
              if(mainCategoryId == null){
                const pageTitles: PageTitles = {
                  mainTitle: 'Welcome To Fresh Market - An Online Store',
                  subTitle: 'Start Shopping'
                }
                return of(pageTitles);
              }
              return this.uiQuery.getItemsCategoriesTitles(mainCategoryId, params['subcategoryId'])
            }
      )
    );
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
