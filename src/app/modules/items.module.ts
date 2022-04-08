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
import { ItemUnitsComponent } from "../components/item-cmps/item-units/item-units.component";
import { ItemUnitNamePipe } from '../pipes/itemUnitName/item-unit-name.pipe';
import { SelectBtnsComponent } from '../components/generic-cmps/select-btns/select-btns.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MinusPlusInputComponent } from '../components/generic-cmps/minus-plus-input/minus-plus-input.component';


@NgModule({
  declarations: [
    ItemsListComponent,
    ItemCardComponent,
    ItemModalComponent,
    ItemUnitsComponent,
    ItemUnitNamePipe,
    SelectBtnsComponent,
    MinusPlusInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ItemsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ItemsListResolver, ItemQuery, ItemStore, ItemUnitNamePipe],
})
export class ItemsModule{

}
