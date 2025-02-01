import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManRoutingModule } from './man-routing.module';

import { HoodiesComponent } from './hoodies/hoodies.component';
import { ShalwarKameezComponent } from './shalwar-kameez/shalwar-kameez.component';
import { SweatshirtsComponent } from './sweatshirts/sweatshirts.component';
import { UnstitchedFabricComponent } from './unstitched-fabric/unstitched-fabric.component';
import { TshirtsComponent } from './tshirts/tshirts.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManRoutingModule,
   
  ]
})
export class ManModule { }
