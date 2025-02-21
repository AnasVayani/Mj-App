import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { TshirtsComponent } from './Component/man/tshirts/tshirts.component';
import { SweatshirtsComponent } from './Component/man/sweatshirts/sweatshirts.component';
import { HoodiesComponent } from './Component/man/hoodies/hoodies.component';
import { ShalwarKameezComponent } from './Component/man/shalwar-kameez/shalwar-kameez.component';
import { UnstitchedFabricComponent } from './Component/man/unstitched-fabric/unstitched-fabric.component';
import { FilterComponent } from './Component/filter/filter.component';
import { ManModule } from './Component/man/man.module';
import { WomanModule } from './Component/woman/woman.module';
import { HomeComponent } from './Component/home/home.component';
import { FooterPart2Component } from './Component/footer-part2/footer-part2.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TshirtsComponent,
    SweatshirtsComponent,
    HoodiesComponent,
    ShalwarKameezComponent,
    UnstitchedFabricComponent,
    FilterComponent,
    HomeComponent,
    FooterPart2Component,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // ManModule,
    // WomanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
