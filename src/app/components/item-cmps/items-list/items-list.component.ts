import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/item/item.model';
import { ItemCategory } from 'src/app/models/item/itemCategory.model';
import { ItemQuery } from 'src/app/state/items/itemQuery';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  public itemsToShow!:Item[];
  items$!: Observable<Item[]>;
  mainCategoryName$!: Observable<string>;
  subCategoryName$!: Observable<string>;

  constructor( private itemQuery: ItemQuery) { }

  ngOnInit(): void {
   this.items$ = this.itemQuery.getItemsToShow();
   this.mainCategoryName$ = this.itemQuery.getMainCategoryName();
   this.subCategoryName$ = this.itemQuery.getSubCategoryName();
  }


}
