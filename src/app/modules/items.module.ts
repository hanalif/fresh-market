import { NgModule } from "@angular/core";
import { ItemsListComponent } from '../components/item-cmps/items-list/items-list.component';
import { ItemPreviewComponent } from '../components/item-cmps/item-preview/item-preview.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ItemsRoutingModule } from "./items-routing.module";
import { ItemsListResolver } from "../services/resolvers/itemsListResolver.service";
import { HttpClientModule } from "@angular/common/http";
import { ItemQuery } from "../state/items/itemQuery";
import { ItemStore } from "../state/items/itemStore";

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ItemsRoutingModule,
    HttpClientModule
  ],
  providers: [ItemsListResolver, ItemQuery, ItemStore],
})
export class ItemsModule{

}
