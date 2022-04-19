import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Animations } from './animations'
import { CartService } from './services/cart.service';
import { UIService } from './services/UI.service';
import { UIQuery } from './state/UI/UIQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.mobileMenuAnimation, Animations.cartAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
 public showWithBackdrop!: boolean;
 public showMobileMenu!: boolean;
 isMobileMenuOpen$!: Observable<boolean>;
 isCartOpen$!: Observable<boolean>;

 constructor( private uIQuery: UIQuery, private uIService:UIService, private cartService: CartService) { }
  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
    this.isCartOpen$ = this.uIQuery.setIsCartOpen();
    this.uIService.getItemsCategories().subscribe(); // todo add routing to app and move to resolver
    this.uIService.updateWhenUrlChangesOccur().subscribe();
    this.cartService.loadItemsOrderInfoFromStorage().subscribe();
  }


  onBackdropClicked(val:boolean){
    this.uIService.setUiStoreAfterBackdropClicked(val);
  }

}


