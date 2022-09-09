import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/modules/personal-area/services/order.service';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { OrderConfirmationDialogData } from './orderConfirmationDialogData.model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  orderConfirmationSubscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderConfirmationDialogData,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    private uiService: UIService) { }

  ngOnInit(): void {

  }

  onConfirmOrder(){
    let data = this.data
    this.orderConfirmationSubscription = this.orderService.saveNewOrder(data.itemsOrderInfo, data.totalPrice, data.user).subscribe();
    this._snackBar.open('Order Saved', 'OK' ,{panelClass: ['snackbar-style']} );
    this.dialogRef.close();
    this.uiService.setIsCartOpen(false);
  }

  onBack(){
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
      this.orderConfirmationSubscription?.unsubscribe();
  }

}
