import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/item/item.model';
import { ItemQuery } from 'src/app/state/items/itemQuery';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit,OnDestroy {
  public itemsToShow!:Item[];
  items$!: Observable<Item[]>;

  constructor( private itemQuery: ItemQuery) { }

  ngOnInit(): void {
   this.items$ = this.itemQuery.getItemsToShow();
  }

  ngOnDestroy(): void {
  }

}
