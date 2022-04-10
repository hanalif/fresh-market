import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-information-menu',
  templateUrl: './information-menu.component.html',
  styleUrls: ['./information-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationMenuComponent implements OnInit {
  isMobileMenuOpen$!: Observable<boolean>
  constructor(private uIQuery: UIQuery) { }

  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
  }

}
