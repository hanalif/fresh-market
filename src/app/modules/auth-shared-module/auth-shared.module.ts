import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material.module";
import { LoggedInUserMenuComponent } from "./components/logged-in-user-menu/logged-in-user-menu.component";

@NgModule({
  declarations: [
    LoggedInUserMenuComponent

  ],

  exports: [
    LoggedInUserMenuComponent

  ],
  imports:[
    AngularMaterialModule
  ]
})
export class AuthSharedModule{

}
