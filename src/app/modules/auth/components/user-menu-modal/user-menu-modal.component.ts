import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReplaySubject, Subscription, takeUntil, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthQuery } from '../../state/auth-state/authQuery';



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
              private cd: ChangeDetectorRef,
              private authQuery: AuthQuery,
              public dialogRef: MatDialogRef<UserMenuModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) { }


  ngOnInit(): void {

      this.authQuery.getLoggedInUser().pipe(takeUntil(this.destroyed$)).subscribe(loggedInUser=>{
          this.loggedInUser = loggedInUser;
          this.cd.detectChanges()
      });


  }

  onCloseModal(): void{
    this.dialogRef.close();
  }





  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
