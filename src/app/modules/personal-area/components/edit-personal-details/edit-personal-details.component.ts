import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserPersonalDetails } from '../../models/personalDetails.model';

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss']
})
export class EditPersonalDetailsComponent implements OnInit, OnDestroy {
  editPersonalDetailsForm!: FormGroup;
  user!: User
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let parentRoutData = this.activatedRoute.parent;
    if(parentRoutData){
        parentRoutData.data.pipe(takeUntil(this.destroyed$)).subscribe(data=>{
        this.user = data['user']
      });
    }
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
