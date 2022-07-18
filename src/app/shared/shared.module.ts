import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MinusPlusInputComponent } from "./components/minus-plus-input/minus-plus-input.component";
import { SelectBtnsComponent } from "./components/select-btns/select-btns.component";


@NgModule({
  declarations: [
    MinusPlusInputComponent,
    SelectBtnsComponent
  ],
  exports: [
    MinusPlusInputComponent,
    SelectBtnsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
})
export class SharedModule{

}
