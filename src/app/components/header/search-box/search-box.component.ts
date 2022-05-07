import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ItemCardMode } from 'src/app/modules/items-shared.module.ts/components/item-card/item-card-mode.enum';
import { Item } from 'src/app/modules/items-shared.module.ts/models/item.model';
import { ItemUnitsValue } from 'src/app/modules/items-shared.module.ts/models/itemUnitsValue.model';
import { ItemService } from 'src/app/modules/items/services/item.service';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { ItemOrderInfo } from 'src/app/shared/models/itemOrderInfo.model';
import { CartQuery } from 'src/app/state/cart/cartQuery';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit, OnChanges ,OnDestroy {

  searchForm!: FormGroup;
  searchItemsResults$?: Observable<Item[]>;
  searchItemsResultsLength$? :Observable<number>;
  ItemCardMode = ItemCardMode;
  itemOrderInfoSubscription!: Subscription;
  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>


  constructor(
      private itemService: ItemService,
      private cartService: CartService,
      private cartQuery: CartQuery,
      private itemsQuery: ItemQuery) { }


  ngOnChanges(): void {
     this.searchForm.get('searchKey')?.valueChanges.pipe(
       debounceTime(300),
       distinctUntilChanged(),
       switchMap((searchKey: string) => this.itemService.getSearchResultItems(searchKey))
     )

  }


  ngOnInit(): void {
    this.initForm();
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();
    this.searchItemsResults$ = this.searchForm.get('searchKey')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchKey: string) => this.itemService.getSearchResultItems(searchKey))
    );

    this.searchItemsResults$?.subscribe(searchResults => {
      console.log(searchResults);
    });

  }


  saveItemUnitsValue(itemOrderInfo: ItemOrderInfo){
    this.itemOrderInfoSubscription = this.cartService.saveItemOrderInfo(itemOrderInfo).subscribe()
  }

  private initForm(){
    this.searchForm = new FormGroup({
      'searchKey': new FormControl(null)
    })
  }


  ngOnDestroy(): void {
    this.itemOrderInfoSubscription?.unsubscribe();
  }
}
