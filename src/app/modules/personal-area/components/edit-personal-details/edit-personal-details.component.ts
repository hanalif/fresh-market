import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
import { UserPersonalDetails } from '../../models/personalDetails.model';

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss']
})
export class EditPersonalDetailsComponent implements OnInit, OnDestroy {
  editPersonalDetailsForm!: FormGroup;
  user!: User
  userSubscription!: Subscription;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private _snackBar: MatSnackBar, private authQuery: AuthQuery) { }

  ngOnInit(): void {
   this.authQuery.getLoggedInUser().pipe(takeUntil(this.destroyed$)).subscribe(user=>{
    const loggedInUser = user as User;
    this.user = loggedInUser;
   })
    this.initForm()
  }

  initForm(){
    this.editPersonalDetailsForm = new FormGroup({
      'name': new FormControl(this.user.name),
      'lastName': new FormControl(this.user.lastname),
      'phone': new FormControl(this.user.phone),
      'email': new FormControl(this.user.email)
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onUpdateChanges(){
    const userUpdatedDetails: UserPersonalDetails = this.editPersonalDetailsForm.value;
    this._snackBar.open('Your Personal Details Changed', 'OK' ,{panelClass: ['snackbar-style']} )
    this.authService.saveLoggedInUserUpdatedPersonalDetails(this.user, userUpdatedDetails).pipe(takeUntil(this.destroyed$)).subscribe()
  }

}
