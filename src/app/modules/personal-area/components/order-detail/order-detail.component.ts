import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailsInput } from '../../models/orderDetailsInput.model';
import { OrderDetailsToDisplay } from '../../models/orderDetailToDisplay.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  orderDetailsInput!: OrderDetailsInput;
  copyItemsToCartSubscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.orderDetailsInput = this.activatedRoute.snapshot.data['orderDetailsInput'];
    console.log(this.orderDetailsInput)
  }

  ngOnDestroy(): void {
      this.copyItemsToCartSubscription.unsubscribe();
  }

  onCopyItemsToCart(){

      this.copyItemsToCartSubscription = this.cartService.copyItemsOrderInfoToCart(this.orderDetailsInput.orderDetailsToDisplay).subscribe()
  }

}
