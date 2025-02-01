import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'man',
    loadChildren: () =>
      import('./Component/man/man.module').then((m) => m.ManModule),
  },
  {
    path: 'woman',
    loadChildren: () =>
      import('./Component/woman/woman.module').then((m) => m.WomanModule),
  },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
