import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { TshirtsComponent } from './Component/man/tshirts/tshirts.component';
import { HoodiesComponent } from './Component/man/hoodies/hoodies.component';
import { ShalwarKameezComponent } from './Component/man/shalwar-kameez/shalwar-kameez.component';
import { SweatshirtsComponent } from './Component/man/sweatshirts/sweatshirts.component';
import { UnstitchedFabricComponent } from './Component/man/unstitched-fabric/unstitched-fabric.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent
//   },
//   {
//     path: 'man',
//     loadChildren: () =>
//       import('./Component/man/man.module').then((m) => m.ManModule),
//   },
//   {
//     path: 'woman',
//     loadChildren: () =>
//       import('./Component/woman/woman.module').then((m) => m.WomanModule),
//   },
//   { path: '**', redirectTo: '' }
// ];
const routes: Routes = [
  {
        path: '',
        component: HomeComponent
  },
  //Men
  { path: 'man/tshirts', component: TshirtsComponent, data: { category: 'men' } },
  { path: 'man/hoodies', component: HoodiesComponent, data: { category: 'men' } },
  { path: 'man/shalwarkameez', component: ShalwarKameezComponent, data: { category: 'men' } },
  { path: 'man/sweatshirts', component: SweatshirtsComponent, data: { category: 'men' } },
  { path: 'man/unstiched', component: UnstitchedFabricComponent, data: { category: 'men' } },

  //Woman
  { path: 'woman/tshirts', component: TshirtsComponent, data: { category: 'women' } },
  { path: 'woman/hoodies', component: HoodiesComponent, data: { category: 'women' } },
  { path: 'woman/sweatshirts', component: SweatshirtsComponent, data: { category: 'women' } },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
