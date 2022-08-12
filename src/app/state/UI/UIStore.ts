import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ItemCategory } from 'src/app/modules/items/models/itemCategory.model';


export interface UIState {
  isMobileMenuOpen: boolean,
  itemsCategories: ItemCategory[],
  isCartOpen: boolean,
  isSearchBoxOpen: boolean,
  isUserModalClose: boolean
}

export const getInitialState = () => {
  return {
    isMobileMenuOpen: false,
    itemsCategories: [],
    isCartOpen: false,
    isSearchBoxOpen: false,
    isUserModalClose: false
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'UI' })
export class UIStore extends Store<UIState> {
  constructor() {
    super(getInitialState());
  }
}
