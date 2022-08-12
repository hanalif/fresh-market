import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserMenuModalComponent } from 'src/app/modules/auth/components/user-menu-modal/user-menu-modal.component';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-logged-in-user-menu',
  templateUrl: './logged-in-user-menu.component.html',
  styleUrls: ['./logged-in-user-menu.component.scss']
})
export class LoggedInUserMenuComponent implements OnInit, OnDestroy {
  @Input() loggedInUser!: User;
  logOutSubscription!: Subscription;
  isUserModalClose!: boolean;
  isUserModalCloseSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiQuery: UIQuery,
    private dialogRef: MatDialogRef<UserMenuModalComponent>

    ) { }

  ngOnInit(): void {
    this.isUserModalCloseSubscription = this.uiQuery.setisUserModalClose().subscribe(val=>{
      this.isUserModalClose = val;
    })
  }

  logOut(){
    this.logOutSubscription = this.authService.logout().subscribe()
  }

  ngOnDestroy(): void {
      this.logOutSubscription?.unsubscribe();
      this.isUserModalCloseSubscription.unsubscribe();
  }

  onEditPersonalDetails(){
    this.router.navigate(['personal-area/edit-personal-details'])
    this._closeModal();
  }

  onMyOrders(){
    this.router.navigate(['personal-area/orders']);
    this._closeModal();
  }

  onShippingDetails(){
    this.router.navigate(['personal-area/shipping-info']);
    this._closeModal();
  }

  onToShopping(){
    this.router.navigate(['']);
    this._closeModal();

  }

  _closeModal(){
    if(this.isUserModalClose){
      return;
    }else{
      this.dialogRef.close();
    }
  }

}
