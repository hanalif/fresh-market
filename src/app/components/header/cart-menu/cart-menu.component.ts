import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCategory } from 'src/app/models/item/itemCategory.model';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss']
})
export class CartMenuComponent implements OnInit {
  // public cartMenuLinksImges: string[] = ['carrot-png-blue-flipped.png','fruit-yellow-png.png', 'leaves-green-png-flipped.png'];

  isMobileMenuOpen$!: Observable<boolean>
  itemsCategories$!: Observable<ItemCategory[]>

  constructor( private uIQuery: UIQuery, private uIService:UIService) { }

  ngOnInit(): void {
    this.uIService.getItemsCategories().subscribe();
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
    this.itemsCategories$ = this.uIQuery.getItemsCategories();

  }

  onToggleDropdownForMobile(){

  }

}
