import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent implements OnInit, OnDestroy {
  shippingDetailsForm!: FormGroup;
  user!: User
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor( private authService: AuthService, private _snackBar: MatSnackBar, private authQuery: AuthQuery) { }

  ngOnInit(): void {
    this.authQuery.getLoggedInUser().pipe(takeUntil(this.destroyed$)).subscribe(user=>{
      const loggedInUser = user as User;
      this.user = loggedInUser;
     })
    this.initForm();
  }

  initForm(){
    const shippingDetails = this.user?.shippingAdress;
    this.shippingDetailsForm = new FormGroup({
      'streetName': new FormControl(shippingDetails? shippingDetails.streetName : '', {validators: [Validators.required]}),
      'streetNumber': new FormControl(shippingDetails? shippingDetails.streetNumber : '', {validators: [Validators.required]}),
      'zipCode': new FormControl(shippingDetails? shippingDetails.zipCode : '', {validators: [Validators.required]}),
      'city': new FormControl(shippingDetails? shippingDetails.city : '', {validators: [Validators.required]}),
  })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onUpdateAdress(){
    this._snackBar.open('Shipping Address Is Updated', 'OK' ,{panelClass: ['snackbar-style']} )
    this.authService.saveShippingAdress(this.user, this.shippingDetailsForm.value).pipe(takeUntil(this.destroyed$)).subscribe();
  }

}
