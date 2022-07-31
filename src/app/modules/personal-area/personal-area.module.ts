import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AngularMaterialModule } from "../angular-material.module";
import { NgScrollbarModule } from 'ngx-scrollbar';
import {RouterModule} from '@angular/router';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { EditPersonalDetailsComponent } from './components/edit-personal-details/edit-personal-details.component';
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component';





@NgModule({
  declarations: [
  
    MyOrdersComponent,
       EditPersonalDetailsComponent,
       ShippingInfoComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    NgScrollbarModule,
    RouterModule
  ],
  providers: [

  ],
})
export class AuthModule{

}
