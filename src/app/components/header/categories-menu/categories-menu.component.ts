import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { ItemCategory } from 'src/app/models/item/itemCategory.model';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { Animations } from '../../../animations'
@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
  animations: [Animations.slidesDownAnumation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartMenuComponent implements OnInit{
  isDropdownMenuOpen: boolean = false;
  isMobileMenuOpen$!: Observable<boolean>
  itemsCategories$!: Observable<ItemCategory[]>
  public openCategiresMaping: any = {};

  constructor( private uIQuery: UIQuery, private router: Router) { }


  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
    this.itemsCategories$ = this.uIQuery.getItemsCategories();

  }

  onClickMobileMenuLink(_id:string){
    if(this.openCategiresMaping[_id]){
      this.openCategiresMaping[_id] = !this.openCategiresMaping[_id];
      this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
    } else{
      this.openCategiresMaping[_id] = true;
      this.isDropdownMenuOpen = true;
    }
  }
}
