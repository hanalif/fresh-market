import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe, switchMap } from 'rxjs';
import { CategoriesTitles } from 'src/app/modules/items/models/categoriesTitles.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { ItemOrderInfo } from 'src/app/shared/models/itemOrderInfo.model';
import { CartQuery } from 'src/app/state/cart/cartQuery';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent implements OnInit{
  public itemsToShow!: Item[];
  items$!: Observable<Item[]>;
  cartItems$! : Observable<ItemOrderInfo[]>
  categoriesTitles$!: Observable<CategoriesTitles>;

  constructor(private itemQuery: ItemQuery, private cartQuery: CartQuery, private uiQuery: UIQuery, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.items$ = this.itemQuery.getItemsToShow();
    this.cartItems$ = this.cartQuery.getItemsOrderInfo();
    this.categoriesTitles$ = this.route.params.pipe(
      switchMap(params=> this.uiQuery.getItemsCategoriesTitles(params['mainCategoryId'], params['subcategoryId'])));
  }

  trackBy(index: number, item: Item) {
    return item._id;
  }

}
