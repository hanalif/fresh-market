import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserMenuModalComponent } from '../user-menu-modal/user-menu-modal.component';

@Component({
  selector: 'app-logged-in-user-menu',
  templateUrl: './logged-in-user-menu.component.html',
  styleUrls: ['./logged-in-user-menu.component.scss']
})
export class LoggedInUserMenuComponent implements OnInit, OnDestroy {
  @Input() loggedInUserName!: string;
  logOutSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private router: Router,
    public dialogRef: MatDialogRef<UserMenuModalComponent>) { }

  ngOnInit(): void {
  }

  logOut(){
    this.logOutSubscription = this.authService.logout().subscribe()
  }

  ngOnDestroy(): void {
      this.logOutSubscription?.unsubscribe()
  }

  onToShopping(){
    this.router.navigate(['']);
  }

  _closeModal(){
    this.dialogRef.close();
  }



}
