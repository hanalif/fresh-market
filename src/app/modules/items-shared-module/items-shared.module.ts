import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AngularMaterialModule } from "../angular-material.module";
import { ItemCardComponent } from "./components/item-card/item-card.component";
import { ItemUnitsComponent } from "./components/item-units/item-units.component";
import { ItemUnitNamePipe } from "./pipes/itemUnitName/item-unit-name.pipe";


@NgModule({
  declarations: [
    ItemUnitNamePipe,
    ItemCardComponent,
    ItemUnitsComponent


  ],
  exports: [
    ItemUnitNamePipe,
    ItemCardComponent,
    ItemUnitsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [
    ItemUnitNamePipe
  ],
})
export class ItemsSharedModule{

}
