import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoodiesComponent } from './hoodies/hoodies.component';

import { SweatshirtsComponent } from './sweatshirts/sweatshirts.component';

import { TshirtsComponent } from './tshirts/tshirts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hoodies',
    pathMatch: 'full',
  },
  { path: 'hoodies', component: HoodiesComponent },
  { path: 'sweatshirts', component: SweatshirtsComponent },
  { path: 'tshirts', component: TshirtsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WomanRoutingModule {}
