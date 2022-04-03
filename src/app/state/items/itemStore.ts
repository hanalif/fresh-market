import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Item } from 'src/app/models/item/item.model';

export interface ItemState {
  itemsToShow: Item[],
  mainCategoryName: string,
  subCategoryName:string,
  searchResultsTitle: string
}

export const getInitialState = () => {
  return {
    itemsToShow: [],
    mainCategoryName: undefined,
    subCategoryName: undefined,
    searchResultsTitle: 'Search Results'
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class ItemStore extends Store<ItemState> {
  constructor() {
    super(getInitialState());
  }
}
