import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  title="e-shop";
  cartItems = [];
  products = {};
  keys = [];
  productForm;

  constructor(public productsService: ProductsService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      cantitate: '',
      details: '',
      imageUrl: '',
      pret: '',
      name: ''
    });
    const storedProducts = JSON.parse(localStorage.getItem('produse'));
    this.cartItems = storedProducts ? storedProducts: [];
    console.log(this.cartItems);
  
    for ( let item of this.cartItems) {
      this.productsService.getProduct(product, item).subscribe( itemCart => { 
        this.products = itemCart;
        this.keys = Object.keys(itemCart);
        console.log(this.products);
      });
    }
  }

  clearCart(){
    localStorage.clear();
    console.log(localStorage);
  }
}
