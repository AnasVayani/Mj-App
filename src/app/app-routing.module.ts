import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import { AddtoCartComponent } from './Component/addto-cart/addto-cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { SelectCountryComponent } from './Component/select-country/select-country.component';
import { SearchComponent } from './Component/search/search.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { LoginComponent } from './Component/auth/login/login.component';
import { RegisterComponent } from './Component/auth/register/register.component';
import { ForgetPasswordComponent } from './Component/auth/forget-password/forget-password.component';
import { OurStoryComponent } from './Component/our-story/our-story.component';
import { BlogComponent } from './Component/blog/blog.component';
import { BlogDetailComponent } from './Component/blog-detail/blog-detail.component';
import { ContactComponent } from './Component/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
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
    path: 'profile',
    component: ProfileComponent,
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
  {
    path: 'our-story',
    component: OurStoryComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
