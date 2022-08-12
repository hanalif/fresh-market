import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { UserMenuModalComponent } from 'src/app/modules/auth/components/user-menu-modal/user-menu-modal.component';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
import { UserQuery } from 'src/app/modules/auth/state/user-state/userQuery';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { LoggedInUserTitleMode } from './logged-in-user-title-mode.enum';

@Component({
  selector: 'app-user-menu-btn',
  templateUrl: './user-menu-btn.component.html',
  styleUrls: ['./user-menu-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuBtnComponent implements OnInit {
  @Input() LoggedInUserTitleMode!: LoggedInUserTitleMode;
  loggedInUserName$!: Observable<string | undefined>

  constructor(
    public dialog: MatDialog,
    private uiService: UIService,
    private authQuery: AuthQuery) { }

  ngOnInit(): void {
    this.loggedInUserName$ = this.authQuery.getLoggedInUser().pipe(
      map(user=> user?.name)
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserMenuModalComponent);
    dialogRef.afterOpened().subscribe(result =>{
      this.uiService.setUiStoreisUserModalClose(false);
    })
    dialogRef.afterClosed().subscribe(result => {
      this.uiService.setUiStoreisUserModalClose(true);
    });
  }

}
