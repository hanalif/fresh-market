import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user-menu-modal',
  templateUrl: './user-menu-modal.component.html',
  styleUrls: ['./user-menu-modal.component.scss']
})
export class UserMenuModalComponent implements OnInit {
  loggedInUser: boolean = false;

  constructor( private authService: AuthService  ,public dialogRef: MatDialogRef<UserMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logout().subscribe()
  }

}
