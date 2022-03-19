import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Item } from 'src/app/models/item/item.model';

export interface ItemState {
  itemsToShow: Item[];
}

export const getInitialState = () => {
  return {
    itemsToShow: [],
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class ItemStore extends Store<ItemState> {
  constructor() {
    super(getInitialState());
  }
}
