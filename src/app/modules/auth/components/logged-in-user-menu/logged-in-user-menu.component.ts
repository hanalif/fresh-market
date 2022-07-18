import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-in-user-menu',
  templateUrl: './logged-in-user-menu.component.html',
  styleUrls: ['./logged-in-user-menu.component.scss']
})
export class LoggedInUserMenuComponent implements OnInit, OnDestroy {
  @Input() loggedInUserName!: string;
  logOutSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.logOutSubscription = this.authService.logout().subscribe()
  }

  ngOnDestroy(): void {
      this.logOutSubscription?.unsubscribe()
  }



}
