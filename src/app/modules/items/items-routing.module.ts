import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemsListResolver } from './resolvers/itemsListResolver.service';

const itemsRoutes: Routes = [
  {
    path: 'items-category',
    children: [
      {
        path: ':mainCategoryId',
        component: ItemsListComponent,
        resolve: [ItemsListResolver],
      },
      {
        path: ':mainCategoryId/:subcategoryId',
        component: ItemsListComponent,
        resolve: [ItemsListResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(itemsRoutes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}