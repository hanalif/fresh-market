import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  map, Observable, switchMap } from 'rxjs';
import { Item } from 'src/app/models/item/item.model';
import { ItemCategory } from 'src/app/models/item/itemCategory.model';
import { ItemQuery } from 'src/app/state/items/itemQuery';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  public itemsToShow!: Item[];
  items$!: Observable<Item[]>;
  mainCategory$!: Observable<ItemCategory | undefined>;

  constructor(private itemQuery: ItemQuery, private uiQuery: UIQuery, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.items$ = this.itemQuery.getItemsToShow();
    this.mainCategory$ = this.route.params.pipe(
        switchMap(params => this.uiQuery.getItemsCategories().pipe(
        map(categories => categories.find(c => c._id === params['mainCategoryId']))
      ))
    );
  }
}
