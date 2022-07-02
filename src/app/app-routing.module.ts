import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './modules/items/components/items-list/items-list.component';
import { ItemsListResolver } from './modules/items/resolvers/itemsListResolver.service';

const routes: Routes = [
  {
    path: "",
    component: ItemsListComponent,
    resolve: [ItemsListResolver],
    runGuardsAndResolvers: 'always'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
