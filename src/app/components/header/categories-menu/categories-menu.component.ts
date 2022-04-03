import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ItemCategory } from 'src/app/models/item/itemCategory.model';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartMenuComponent implements OnInit{

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
    } else{
      this.openCategiresMaping[_id] = true;
    }
  }

}
