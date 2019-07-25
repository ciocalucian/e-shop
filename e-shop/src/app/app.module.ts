import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { ModalModule } from 'ngb-modal';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ProductsService } from './shared/products.service';
import { EditProductModalComponent } from './admin/edit-product-modal/edit-product-modal.component';
import { ProductDetailsComponent } from './main-page/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AdminComponent,
    CartComponent,
    NavBarComponent,
    EditProductModalComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
  entryComponents: [
    EditProductModalComponent
  ]
})
export class AppModule { }
