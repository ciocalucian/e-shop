import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: 'main-page', component: MainPageComponent },
  {path: 'details', component: DetailsComponent},
  {path: 'cart', component: CartComponent },
  {path: 'admin', component: AdminComponent },
  {path: '', 
    redirectTo: '/main-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
