import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserMenuModalComponent } from './components/user-menu-modal/user-menu-modal.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AngularMaterialModule } from "../angular-material.module";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoggedInUserMenuComponent } from './components/logged-in-user-menu/logged-in-user-menu.component';





@NgModule({
  declarations: [
    LoginFormComponent,
    UserMenuModalComponent,
    SignupFormComponent,
    LoggedInUserMenuComponent,

  ],
  exports: [
    LoginFormComponent,
    UserMenuModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    NgScrollbarModule

  ],
  providers: [

  ],
})
export class AuthModule{

}
