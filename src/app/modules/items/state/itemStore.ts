import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Item } from '../models/item.model';

export interface ItemState {
  itemsToShow: Item[],
  itemsToShowInCart: Item[]
}

export const getInitialState = () => {
  return {
    itemsToShow: [],
    itemsToShowInCart: []
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class ItemStore extends Store<ItemState> {
  constructor() {
    super(getInitialState());
  }
}
