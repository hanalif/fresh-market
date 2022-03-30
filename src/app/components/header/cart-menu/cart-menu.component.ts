import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ItemCategory } from 'src/app/models/item/itemCategory.model';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartMenuComponent implements OnInit, OnDestroy{

  isMobileMenuOpen$!: Observable<boolean>
  itemsCategories$!: Observable<ItemCategory[]>
  private isMobileOpenSubscription!: Subscription
  public openCategiresMaping: any = {};

  constructor( private uIQuery: UIQuery, private uIService:UIService) { }
  ngOnDestroy(): void {
    this.isMobileOpenSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.uIService.getItemsCategories().subscribe();
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
    this.itemsCategories$ = this.uIQuery.getItemsCategories();

  }

  onClickMobileMenuLink(_id:string){
    let isMobileOpen:boolean = false;
    this.isMobileOpenSubscription = this.isMobileMenuOpen$.subscribe(res=>{
      isMobileOpen = res
    })

    if(!isMobileOpen){
      return
    }

    if(this.openCategiresMaping[_id]){
      this.openCategiresMaping[_id] = !this.openCategiresMaping[_id];
    } else{
      this.openCategiresMaping[_id] = true;
    }
  }

}
