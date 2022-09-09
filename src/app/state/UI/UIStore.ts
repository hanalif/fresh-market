import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ItemCategory } from 'src/app/modules/items/models/itemCategory.model';


export interface UIState {
  isMobileMenuOpen: boolean,
  itemsCategories: ItemCategory[],
  isCartOpen: boolean,
  isSearchBoxOpen: boolean,
  isUserModalClose: boolean,
  numOfNewOrders: number
}

export const getInitialState = () => {
  return {
    isMobileMenuOpen: false,
    itemsCategories: [],
    isCartOpen: false,
    isSearchBoxOpen: false,
    numOfNewOrders: 0
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'UI' })
export class UIStore extends Store<UIState> {
  constructor() {
    super(getInitialState());
  }
}
