import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ItemCategory } from 'src/app/models/item/itemCategory.model';


export interface UIState {
  isMobileMenuOpen: boolean,
  itemsCategories: ItemCategory[]
}

export const getInitialState = () => {
  return {
    isMobileMenuOpen: false,
    itemsCategories: []
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'UI' })
export class UIStore extends Store<UIState> {
  constructor() {
    super(getInitialState());
  }
}
