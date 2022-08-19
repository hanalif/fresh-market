import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsToDisplay } from '../../models/orderDetailToDisplay.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetailsToDisplay!: OrderDetailsToDisplay[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderDetailsToDisplay = this.activatedRoute.snapshot.data['orderDetailsToDisplay'];
    console.log(this.orderDetailsToDisplay)
  }

}
