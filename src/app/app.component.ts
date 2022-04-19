import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
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
export class AppComponent implements OnInit, OnDestroy {
 public showWithBackdrop!: boolean;
 public showMobileMenu!: boolean;
 isMobileMenuOpen$!: Observable<boolean>;
 isCartOpen$!: Observable<boolean>;
 private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

 constructor( private uIQuery: UIQuery, private uIService:UIService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();
    this.isCartOpen$ = this.uIQuery.setIsCartOpen();
    this.uIService.getItemsCategories().pipe(takeUntil(this.destroyed$)).subscribe(); // todo add routing to app and move to resolver
    this.uIService.updateWhenUrlChangesOccur().pipe(takeUntil(this.destroyed$)).subscribe();
    this.cartService.loadItemsOrderInfoFromStorage().pipe(takeUntil(this.destroyed$)).subscribe();
  }


  onBackdropClicked(val:boolean){
    this.uIService.setUiStoreAfterBackdropClicked(val);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}


