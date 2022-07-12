import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, ReplaySubject, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Animations } from './animations'
import { AuthService } from './modules/auth/services/auth.service';
import { UserService } from './modules/auth/services/user.service';
import { CartService } from './services/cart.service';
import { UIService } from './services/UI.service';
import { UIQuery } from './state/UI/UIQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.mobileMenuAnimation, Animations.cartAnimation, Animations.slidesDownAnumation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit, OnDestroy {
 public showWithBackdrop!: boolean;
 public showMobileMenu!: boolean;
 isMobileMenuOpen$!: Observable<boolean>;
 isCartOpen$!: Observable<boolean>;
 isSearchBoxOpen: boolean = false;
 isSearchBoxOpenSubscription!: Subscription;
 private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

 constructor(
    private uIQuery: UIQuery,
    private uIService:UIService,
     private cartService: CartService,
     private renderer: Renderer2,
     private authService: AuthService,
     private userService: UserService) { }


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

    this.isSearchBoxOpenSubscription = this.uIQuery.setIsSearchBoxOpen().pipe(takeUntil(this.destroyed$)).subscribe(val=>{
      this.isSearchBoxOpen = val;
    })

    this.uIService.getItemsCategories().pipe(takeUntil(this.destroyed$)).subscribe(); // todo add routing to app and move to resolver
    this.uIService.updateWhenUrlChangesOccur().pipe(takeUntil(this.destroyed$)).subscribe();
    this.cartService.loadItemsOrderInfoFromStorage().pipe(takeUntil(this.destroyed$)).subscribe();

    this.authService.setInitialLoggedInUser().pipe(takeUntil(this.destroyed$)).subscribe();
    this.userService.getUsers().pipe(takeUntil(this.destroyed$)).subscribe();


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
      this.renderer.addClass(document.body, 'overflow-hidden');
    }else{
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }



}


