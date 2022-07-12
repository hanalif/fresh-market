import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, map, Observable, of, ReplaySubject, Subscription, takeUntil, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AuthQuery } from '../../state/auth-state/authQuery';
import { UserQuery } from '../../state/user-state/userQuery';



@Component({
  selector: 'app-user-menu-modal',
  templateUrl: './user-menu-modal.component.html',
  styleUrls: ['./user-menu-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuModalComponent implements OnInit, OnDestroy {

  loggedInUser!: User | undefined;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
              private authService: AuthService,
              private cd: ChangeDetectorRef,
              private userQuery: UserQuery,
              private authQuery: AuthQuery,
              public dialogRef: MatDialogRef<UserMenuModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) { }



  ngOnInit(): void {

      this.userQuery.getLoggedInUser().pipe(takeUntil(this.destroyed$)).subscribe(loggedInUser=>{
          this.loggedInUser = loggedInUser;
          this.cd.detectChanges()
      });

  }


  logOut(){
    this.authService.logout().pipe(takeUntil(this.destroyed$)).subscribe()
  }

  logIn(){
    this.authService.login({username: 'Amit', password: '1234'}).pipe(takeUntil(this.destroyed$)).subscribe()
  }

  signUp(){
    this.authService.signup({username: 'Amit', name: 'Amit',lastname: 'zvaygen', password: '1234', email: 'helo@helo.com', phone: 1234}).pipe(takeUntil(this.destroyed$)).subscribe()
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
