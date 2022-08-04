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
  },
  {
    path: 'personal-area',
    loadChildren: () => import('./modules/personal-area/personal-area.module').then(m => m.PersonalAreaModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
