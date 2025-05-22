import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import { AddtoCartComponent } from './Component/addto-cart/addto-cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { SelectCountryComponent } from './Component/select-country/select-country.component';
import { SearchComponent } from './Component/search/search.component';
import { StoryComponent } from './Component/story/story.component';
import { ContactComponent } from './Component/contact/contact.component';
import { BlogComponent } from './Component/blog/blog.component';
import { BlogDetailComponent } from './Component/blog-detail/blog-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: '1' }
  },
  {
    path: 'select-country',
    component: SelectCountryComponent,
    data: { animation: '2' }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { animation: '3' }
  },
  {
    path: 'product',
    component: ProductComponent,
    data: { animation: '4' }
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    data: { animation: '5' }
  },
  {
    path: 'cart',
    component: AddtoCartComponent,
    data: { animation: '6' }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { animation: '7' }
  },
  {
    path: 'our-story',
    component: StoryComponent,
    data: { animation: '8' }
  },
  {
    path: 'contact-us',
    component: ContactComponent,
    data: { animation: '9' }
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: { animation: '10' }
  },
  {
    path: 'blog/:slug',
    component: BlogDetailComponent,
    data: { animation: '11' }
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
