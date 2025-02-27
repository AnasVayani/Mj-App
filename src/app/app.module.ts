import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';


import { FilterComponent } from './Component/filter/filter.component';

import { HomeComponent } from './Component/home/home.component';
import { FooterPart2Component } from './Component/footer-part2/footer-part2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './Component/product/product.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import { TshirtsComponent } from './Component/tshirts/tshirts.component';
import { RelatedProductComponent } from './Component/related-product/related-product.component';
import { CartNotificationComponent } from './Component/cart-notification/cart-notification.component';
import { AddtoCartComponent } from './Component/addto-cart/addto-cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { SelectCountryComponent } from './Component/select-country/select-country.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SearchComponent } from './Component/search/search.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { LoginComponent } from './Component/auth/login/login.component';
import { RegisterComponent } from './Component/auth/register/register.component';
import { ForgetPasswordComponent } from './Component/auth/forget-password/forget-password.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TshirtsComponent,
    

    FilterComponent,
    HomeComponent,
    FooterPart2Component,
    ProductComponent,
    ProductDetailComponent,
    RelatedProductComponent,
    CartNotificationComponent,
    AddtoCartComponent,
    CheckoutComponent,
    SelectCountryComponent,
    SearchComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
