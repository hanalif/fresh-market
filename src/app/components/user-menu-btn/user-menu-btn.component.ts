import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { UserMenuModalComponent } from 'src/app/modules/auth/components/user-menu-modal/user-menu-modal.component';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
import { OrderQuery } from 'src/app/modules/personal-area/state/order-state/orderQuery';
import { LoggedInUserTitleMode } from './logged-in-user-title-mode.enum';

@Component({
  selector: 'app-user-menu-btn',
  templateUrl: './user-menu-btn.component.html',
  styleUrls: ['./user-menu-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuBtnComponent implements OnInit, OnDestroy {
  @Input() LoggedInUserTitleMode!: LoggedInUserTitleMode;
  loggedInUserName$!: Observable<string | undefined>
  loggedInUser: User | undefined;
  badgenum!: number;
  loggedInUserSubscription!: Subscription;
  hidden: boolean = true;

  constructor(
    public dialog: MatDialog,
    private authQuery: AuthQuery, private orderQuery: OrderQuery,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    const loggedInUserAndBadgeNum$ = this.authQuery.getLoggedInUser().pipe(switchMap(user=>{
      this.loggedInUser = user;
      return this.orderQuery.getUnreadOrdersForBadge(user?._id, user?.ordersId).pipe(tap(num=>{
        if(num === 0){
          this.hidden = true;
        }else{
          this.hidden = false;
          this.badgenum = num;
        }
        this.cd.detectChanges();
      }))
    }))

    this.loggedInUserSubscription = loggedInUserAndBadgeNum$.subscribe()

  }

  openDialog(): void {
    this.dialog.open(UserMenuModalComponent);
  }

  ngOnDestroy(): void {
      this.loggedInUserSubscription.unsubscribe();
  }

}
