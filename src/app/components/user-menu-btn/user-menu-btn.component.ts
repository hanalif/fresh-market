import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { UserMenuModalComponent } from 'src/app/modules/auth/components/user-menu-modal/user-menu-modal.component';
import { AuthQuery } from 'src/app/modules/auth/state/auth-state/authQuery';
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
    private authQuery: AuthQuery) { }

  ngOnInit(): void {
    this.loggedInUserName$ = this.authQuery.getLoggedInUser().pipe(
      map(user=> user?.name)
    )
  }

  openDialog(): void {
    this.dialog.open(UserMenuModalComponent);
  }

}
