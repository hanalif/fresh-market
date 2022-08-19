import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { Order } from 'src/app/shared/models/order/order.model';
import { PersonalOrderItem } from 'src/app/shared/models/order/personalOrderItem.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit  {

  personalOrders!: Order[];

  constructor( private activatedRoute: ActivatedRoute, private route: Router) { }


  ngOnInit(): void {
    this.personalOrders = this.activatedRoute.snapshot.data['personalOrders']
  }



}
