import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Observable, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
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
 isSearchBoxOpen$!: Observable<boolean>;
 private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);



 constructor(
    private uIQuery: UIQuery,
    private uIService:UIService,
     private cartService: CartService,
     private renderer: Renderer2) { }

  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen().pipe(
      tap(isMobileMenuOpen=>{
        this._checksIfSideNavOpen(isMobileMenuOpen);
      })
    );
    this.isCartOpen$ = this.uIQuery.setIsCartOpen().pipe(
      tap(isCartOpen=>{
       this._checksIfSideNavOpen(isCartOpen);
      })
    );
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

  _checksIfSideNavOpen(val:boolean){
    if(val){
      this.renderer.addClass(document.body, 'side-nav-open');
    }else{
      this.renderer.removeClass(document.body, 'side-nav-open');
    }
  }

}


