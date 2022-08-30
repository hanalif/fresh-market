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
import { PersonalAreaRoutingModule } from "./personal-area-routing.module";
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { AuthSharedModule } from "../auth-shared-module/auth-shared.module";
import { PersonalAreaResolver } from "./resolvers/personalAreaResolver.service";
import { PersonalAreaUserOrderResolver } from "./resolvers/personalAreaUserOrdersResolver";
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ItemsSharedModule } from "../items-shared-module/items-shared.module";





@NgModule({
  declarations: [

    MyOrdersComponent,
       EditPersonalDetailsComponent,
       ShippingInfoComponent,
       PersonalAreaComponent,
       OrderDetailComponent
  ],
  exports: [
    AngularMaterialModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    NgScrollbarModule,
    RouterModule,
    PersonalAreaRoutingModule,
    AuthSharedModule,
    ItemsSharedModule
  ],
  providers: [
    PersonalAreaResolver,
    PersonalAreaUserOrderResolver
  ],
})
export class PersonalAreaModule{

}
