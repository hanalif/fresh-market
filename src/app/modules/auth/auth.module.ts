import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserMenuModalComponent } from './components/user-menu-modal/user-menu-modal.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AngularMaterialModule } from "../angular-material.module";
import { NgScrollbarModule } from 'ngx-scrollbar';
import {RouterModule} from '@angular/router';
import { AuthSharedModule } from "../auth-shared-module/auth-shared.module";





@NgModule({
  declarations: [
    LoginFormComponent,
    UserMenuModalComponent,
    SignupFormComponent,

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
    NgScrollbarModule,
    RouterModule,
    AuthSharedModule


  ],
  providers: [

  ],
})
export class AuthModule{

}
