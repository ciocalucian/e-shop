import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  title="e-shop";
  products = {};
  keys = [];

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    const storedProducts = JSON.parse(localStorage.getItem('produse'));
    this.products = storedProducts;
    this.keys = Object.keys(storedProducts);
  }

  clearCart(){
    localStorage.clear();
    this.products = {};
    this.keys = [];
  }

  deleteProdCart(key){
    delete this.products[key];
    this.keys = this.keys.filter(existingKey => existingKey !== key);
    localStorage.setItem('produse', JSON.stringify(this.products));
  }
}
