import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  title="e-shop";
  products = {};
  keys = [];
  
  constructor(private productsService: ProductsService) { }

  
  ngOnInit() {
    this.productsService.getProducts().subscribe(prodResponse => {
      this.products = prodResponse;
      this.keys = Object.keys(prodResponse);
    });

  }

  addToCart(key){
    localStorage.setItem('${key}', JSON.stringify(key));
  }

}