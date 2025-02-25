import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import { AddtoCartComponent } from './Component/addto-cart/addto-cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { SelectCountryComponent } from './Component/select-country/select-country.component';
import { SearchComponent } from './Component/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'select-country',
    component: SelectCountryComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    component: AddtoCartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
