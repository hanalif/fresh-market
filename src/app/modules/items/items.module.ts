import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ItemsRoutingModule } from "./items-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ItemQuery } from "src/app/modules/items/state/itemQuery";
import { ItemModalComponent } from "./components/item-modal/item-modal.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";
import { ItemsListResolver } from "./resolvers/itemsListResolver.service";
import { SharedModule } from "src/app/shared/shared.module";
import { ItemStore } from "./state/itemStore";
import { ItemsSharedModule } from "../items-shared-module/items-shared.module";

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemModalComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ItemsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    ItemsSharedModule
  ],
  providers: [ItemsListResolver, ItemQuery, ItemStore],
})
export class ItemsModule{

}
