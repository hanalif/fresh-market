import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {RouterModule} from '@angular/router';
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
    RouterModule,
    AngularMaterialModule,
    CommonModule
  ]
})
export class AuthSharedModule{

}
