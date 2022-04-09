import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ItemsRoutingModule } from "./items-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ItemQuery } from "src/app/state/items/itemQuery";
import { ItemStore } from "src/app/state/items/itemStore";
import { ItemCardComponent } from "./components/item-card/item-card.component";
import { ItemModalComponent } from "./components/item-modal/item-modal.component";
import { ItemUnitsComponent } from "./components/item-units/item-units.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";
import { ItemUnitNamePipe } from "./pipes/itemUnitName/item-unit-name.pipe";
import { ItemsListResolver } from "./resolvers/itemsListResolver.service";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemCardComponent,
    ItemModalComponent,
    ItemUnitsComponent,
    ItemUnitNamePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ItemsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ItemsListResolver, ItemQuery, ItemStore, ItemUnitNamePipe],
})
export class ItemsModule{

}
