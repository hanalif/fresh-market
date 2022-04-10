import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu-btn',
  templateUrl: './user-menu-btn.component.html',
  styleUrls: ['./user-menu-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
