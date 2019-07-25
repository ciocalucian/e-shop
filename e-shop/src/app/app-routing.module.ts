import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { ProductDetailsComponent } from './main-page/product-details/product-details.component';

const routes: Routes = [
  {path: 'main-page', component: MainPageComponent},
  {path: 'product/:key', component: ProductDetailsComponent},
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
