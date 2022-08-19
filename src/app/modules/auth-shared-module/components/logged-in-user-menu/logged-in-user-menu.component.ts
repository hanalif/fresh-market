import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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


  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserMenuModalComponent>

    ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.logOutSubscription = this.authService.logout().subscribe()
  }

  ngOnDestroy(): void {
      this.logOutSubscription?.unsubscribe();
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
