import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'shop/men', component: MenComponent },
//   { path: 'shop/women', component: WomenComponent },
//   { path: 'shop/kids', component: KidsComponent },
//   { path: 'shop/footwear', component: FootwearComponent },
//   { path: 'our-story', component: OurStoryComponent },
//   { path: 'blog', component: BlogComponent },
//   { path: 'contact', component: ContactComponent },
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
