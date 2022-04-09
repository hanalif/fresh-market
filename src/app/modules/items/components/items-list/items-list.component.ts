import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  map, Observable, switchMap } from 'rxjs';
import { CategoriesTitles } from 'src/app/modules/items/models/categoriesTitles.model';
import { ItemQuery } from 'src/app/modules/items/state/itemQuery';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  public itemsToShow!: Item[];
  items$!: Observable<Item[]>;
  categoriesTitles$!: Observable<CategoriesTitles>;

  constructor(private itemQuery: ItemQuery, private uiQuery: UIQuery, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.items$ = this.itemQuery.getItemsToShow();
    this.categoriesTitles$ = this.route.params.pipe(
      switchMap(params=> this.uiQuery.getItemsCategoriesTitles(params['mainCategoryId'], params['subcategoryId'])));
  }
}
