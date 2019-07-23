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
  products = {};
  keys = [];
  productForm;

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    const storedProducts = JSON.parse(localStorage.getItem('produse'));
    this.keys = storedProducts ? storedProducts: [];
    console.log(this.keys);
    console.log(this.products);
    
    for(let key of this.keys){
      this.productsService.getProductI(key).subscribe( resp => {
        this.products += resp;
        console.log(resp,this.products)
      }

      )
    }
  }

  clearCart(){
    localStorage.clear();
    console.log(localStorage);
  }
}
