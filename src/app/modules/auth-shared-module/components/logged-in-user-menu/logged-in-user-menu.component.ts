import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserMenuModalComponent } from 'src/app/modules/auth/components/user-menu-modal/user-menu-modal.component';
import { OrderQuery } from 'src/app/modules/personal-area/state/order-state/orderQuery';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';

@Component({
  selector: 'app-logged-in-user-menu',
  templateUrl: './logged-in-user-menu.component.html',
  styleUrls: ['./logged-in-user-menu.component.scss']
})
export class LoggedInUserMenuComponent implements OnInit, OnDestroy {
  loggedInUser!: User;
  logOutSubscription!: Subscription;
  badgenum!: number;
  badgeNumSubscription!: Subscription;
  hidden: boolean = true;


  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserMenuModalComponent>,
    private orderQuery: OrderQuery,
    private cd: ChangeDetectorRef,
    private authQuery: AuthQuery

    ) { }

  ngOnInit(): void {
    const badgenum$ = this.authQuery.getLoggedInUser().pipe(switchMap(user=>{
      let loggedUser = user as User;
      this.loggedInUser = loggedUser;
      return this.orderQuery.getUnreadOrdersForBadge(loggedUser._id, loggedUser.ordersId);
    }))

    this.badgeNumSubscription = badgenum$.subscribe(num=>{
      if(num === 0){
        this.hidden = true;
      }else{
        this.hidden = false;
        this.badgenum = num;
      }
      this.cd.detectChanges();
    })
  }

  logOut(){
    this.logOutSubscription = this.authService.logout().subscribe()
  }

  ngOnDestroy(): void {
      this.logOutSubscription?.unsubscribe();
      this.badgeNumSubscription.unsubscribe();
  }


  onMenuLink(){
    this._closeModal();
  }

  _closeModal(){
    if(this.dialogRef.close) {
      this.dialogRef.close();
    }
  }

}
