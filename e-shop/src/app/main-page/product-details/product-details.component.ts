import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products = {};
  keys = [];
  key = '';

  constructor(private productsService: ProductsService,private router: Router) { }

  ngOnInit() {
   const detailProd =  JSON.parse(localStorage.getItem('detail'));
   this.products = detailProd;
   this.keys = Object.keys(detailProd);
   this.key = this.keys[0];
  }

  addToCart(product, key){
    let cartKeys = {}
    if (JSON.parse(localStorage.getItem('produse'))) {
      cartKeys = JSON.parse(localStorage.getItem('produse'));
    }
    cartKeys[key] = product;
    
    localStorage.setItem('produse', JSON.stringify(cartKeys));
    this.router.navigateByUrl("/cart");

  }
}
