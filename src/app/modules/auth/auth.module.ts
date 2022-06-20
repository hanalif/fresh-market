import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserMenuModalComponent } from './components/user-menu-modal/user-menu-modal.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    UserMenuModalComponent

  ],
  exports: [
    LoginFormComponent,
    UserMenuModalComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [

  ],
})
export class AuthModule{

}
