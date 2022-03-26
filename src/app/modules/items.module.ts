import { NgModule } from "@angular/core";
import { ItemsListComponent } from '../components/item-cmps/items-list/items-list.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ItemsRoutingModule } from "./items-routing.module";
import { ItemsListResolver } from "../services/resolvers/itemsListResolver.service";
import { HttpClientModule } from "@angular/common/http";
import { ItemQuery } from "../state/items/itemQuery";
import { ItemStore } from "../state/items/itemStore";
import { ItemCardComponent } from "../components/item-cmps/item-card/item-card.component";
import { ItemModalComponent } from "../components/item-cmps/item-modal/item-modal.component";

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemCardComponent,
    ItemModalComponent
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
