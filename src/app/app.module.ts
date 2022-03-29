import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ItemsModule } from './modules/items.module';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBoxComponent } from './components/header/search-box/search-box.component';
import { CartMenuComponent } from './components/header/cart-menu/cart-menu.component';
import { MainHeaderNavComponent } from './components/header/main-header-nav/main-header-nav.component';
import { MobileMenuComponent } from './components/header/mobile-menu/mobile-menu.component';
import { CartComponent } from './components/cart-cmps/cart/cart.component';
import { UserMenuBtnComponent } from './components/user-menu-btn/user-menu-btn.component';
import { CartMenuDropdownComponent } from './components/cart-menu-dropdown/cart-menu-dropdown.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBoxComponent,
    CartMenuComponent,
    MainHeaderNavComponent,
    MobileMenuComponent,
    CartComponent,
    UserMenuBtnComponent,
    CartMenuDropdownComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ItemsModule,
    AngularMaterialModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
