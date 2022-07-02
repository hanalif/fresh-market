import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCmpComponent } from 'src/app/components/test-cmp/test-cmp.component';
import { ItemCardComponent } from '../items-shared.module.ts/components/item-card/item-card.component';
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
        runGuardsAndResolvers: 'always'
      },
      {
        path: ':mainCategoryId/:subcategoryId',
        component: ItemsListComponent,
        resolve: [ItemsListResolver],
        runGuardsAndResolvers: 'always'
      },
    ],
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(itemsRoutes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
