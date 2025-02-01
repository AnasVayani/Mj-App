import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoodiesComponent } from './hoodies/hoodies.component';
import { ShalwarKameezComponent } from './shalwar-kameez/shalwar-kameez.component';
import { SweatshirtsComponent } from './sweatshirts/sweatshirts.component';
import { UnstitchedFabricComponent } from './unstitched-fabric/unstitched-fabric.component';
import { TshirtsComponent } from './tshirts/tshirts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hoodies',
    pathMatch: 'full',
  },
  { path: 'hoodies', component: HoodiesComponent },
  { path: 'shalwar-kameez', component: ShalwarKameezComponent },
  { path: 'sweatshirts', component: SweatshirtsComponent },
  { path: 'unstitched-fabric', component: UnstitchedFabricComponent },
  { path: 'tshirts', component: TshirtsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManRoutingModule { }
