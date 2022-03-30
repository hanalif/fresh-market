import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-main-header-nav',
  templateUrl: './main-header-nav.component.html',
  styleUrls: ['./main-header-nav.component.scss']
})
export class MainHeaderNavComponent implements OnInit {
  isMobileMenuOpen$!: Observable<boolean>
  constructor(private uIQuery: UIQuery) { }

  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
  }

}
