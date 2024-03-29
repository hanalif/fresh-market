import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { SearchBoxComponent } from './components/header/search-box/search-box.component';
import { CartMenuComponent } from './components/header/categories-menu/categories-menu.component';
import { InformationMenuComponent } from './components/header/information-menu/information-menu.component';
import { MobileMenuComponent } from './components/header/mobile-menu/mobile-menu.component';
import { UserMenuBtnComponent } from './components/user-menu-btn/user-menu-btn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsModule } from './modules/items/items.module';
import { SharedModule } from './shared/shared.module';
import { CartComponent } from './components/header/cart/cart.component';
import { CartBtnComponent } from './components/cart-btn/cart-btn.component';
import { environment } from 'src/environments/environment';
import { ItemsSharedModule } from './modules/items-shared-module/items-shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PersonalAreaModule } from './modules/personal-area/personal-area.module';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBoxComponent,
    CartMenuComponent,
    InformationMenuComponent,
    MobileMenuComponent,
    UserMenuBtnComponent,
    CartComponent,
    CartBtnComponent,
    OrderConfirmationComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ItemsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    ItemsSharedModule,
    AuthModule,
    NgScrollbarModule,
    PersonalAreaModule,
    environment.production ? [] : AkitaNgDevtools.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
