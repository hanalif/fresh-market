import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ItemCardMode } from 'src/app/modules/items-shared-module/components/item-card/item-card-mode.enum';
import { Item } from 'src/app/modules/items-shared-module/models/item.model';
import { ItemUnitsValue } from 'src/app/modules/items-shared-module/models/itemUnitsValue.model';
import { ItemService } from 'src/app/modules/items/services/item.service';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { CartService } from 'src/app/services/cart.service';
import { ItemOrderInfo } from 'src/app/shared/models/order/itemOrderInfo.model';

import { CartQuery } from 'src/app/state/cart/cartQuery';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit ,OnDestroy {

  searchForm!: FormGroup;
  searchItemsResults?: Item[];
  searchItemsKeySub?: Subscription;

  ItemCardMode = ItemCardMode;
  itemOrderInfoSubscription!: Subscription;
  searchItemsResultsSubscription!: Subscription | undefined;
  itemUnitsMap$! : Observable<{ [id: string] : ItemUnitsValue }>




  constructor(
      private itemService: ItemService,
      private cartService: CartService,
      private cartQuery: CartQuery,
      private itemQuery: ItemQuery,
      private cd: ChangeDetectorRef,
      private renderer: Renderer2) { }


  ngOnInit(): void {
    this.initForm();
    this.itemUnitsMap$ = this.cartQuery.getCartItemUnitsMap();
    this.searchItemsKeySub = this.searchForm.get('searchKey')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchKey: string) => this.itemService.getSearchResultItems(searchKey))
    ).subscribe();

    this.searchItemsResultsSubscription = this.itemQuery.getSearchresultsItems().subscribe(items=>{
      this.searchItemsResults = items;
      if(items != null && items.length != 0){
        this._checksIfSearchItemsResults(true);
      }else{
        this._checksIfSearchItemsResults(false);
      }
      this.cd.detectChanges();
    })
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
    this.searchItemsResultsSubscription?.unsubscribe();
    this.searchItemsKeySub?.unsubscribe();
  }


  _checksIfSearchItemsResults(val:boolean){
    if(val){
      this.renderer.addClass(document.body, 'overflow-hidden');
    }else{
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }
}
