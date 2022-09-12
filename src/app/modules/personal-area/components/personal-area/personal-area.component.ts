import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {
  user!: User;
  userSubscription!: Subscription;

  constructor(
   private authQuery: AuthQuery
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authQuery.getLoggedInUser().subscribe(user=>{
      let loggedInUser = user as User;
      this.user = loggedInUser;
    })
  }





}
