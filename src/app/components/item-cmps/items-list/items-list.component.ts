import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item/item.model';
import { ItemQuery } from 'src/app/state/items/itemQuery';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit,OnDestroy {
  public itemsToShow!:Item[];
  private itemsSubscription!: Subscription;

  constructor( private itemQuery: ItemQuery) { }

  ngOnInit(): void {
   this.itemsSubscription = this.itemQuery.getItemsToShow().subscribe(items=>{
      this.itemsToShow = items;
      console.log(this.itemsToShow)
    })
  }

  ngOnDestroy(): void {
      this.itemsSubscription.unsubscribe()
  }

}
