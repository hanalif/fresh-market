import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Item } from '../../items-shared.module.ts/models/item.model';

export interface ItemState {
  itemsToShow: Item[],
  itemsToShowInCart: Item[],
  itemsSearchResults: Item[]
}

export const getInitialState = () => {
  return {
    itemsToShow: [],
    itemsToShowInCart: [],
    itemsSearchResults: [],
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class ItemStore extends Store<ItemState> {
  constructor() {
    super(getInitialState());
  }
}
