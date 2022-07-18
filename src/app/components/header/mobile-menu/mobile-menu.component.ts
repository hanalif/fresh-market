import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { LoggedInUserTitleMode } from '../../user-menu-btn/logged-in-user-title-mode.enum';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent implements OnInit {
  isMobileMenuOpen$!: Observable<boolean>
  loggedInUserTitleMode = LoggedInUserTitleMode;


  constructor(private uIQuery: UIQuery, private uIService:UIService) { }

  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
  }

  onCloseMenu(val: boolean){
    this.uIService.setIsMobileMenuOpen(val);
  }

}
