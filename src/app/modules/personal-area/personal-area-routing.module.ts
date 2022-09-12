import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPersonalDetailsComponent } from './components/edit-personal-details/edit-personal-details.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component';
import { AuthGuard } from './guards/authGuard.service';
import { PersonalAreaOrderDetailResolver } from './resolvers/personalAreaOrderDetailResolver.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: PersonalAreaComponent,
    children: [
      {
        path: 'edit-personal-details',
        component: EditPersonalDetailsComponent
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: MyOrdersComponent
          },
          {
            path: ':orderId',
            component: OrderDetailComponent,
            resolve: {orderDetailsInput: PersonalAreaOrderDetailResolver}
          }
        ]
      },

      {
        path: 'shipping-info',
        component: ShippingInfoComponent,
      },
    ],

    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalAreaRoutingModule {}
