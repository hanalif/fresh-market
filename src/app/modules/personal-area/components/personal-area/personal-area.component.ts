import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('personalMenu') personalMenu!: ElementRef<HTMLDivElement>;

  constructor(
   private authQuery: AuthQuery,
   private cd: ChangeDetectorRef
  ) {

   }

  ngOnInit(): void {
    this.userSubscription = this.authQuery.getLoggedInUser().subscribe(user=>{
      let loggedInUser = user as User;
      this.user = loggedInUser;
    })

  }







}
