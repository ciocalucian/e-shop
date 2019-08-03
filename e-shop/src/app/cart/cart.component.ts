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
  productsInCart: number;
  totalPrice= 0;
  orderedProducts = [];
  orderItems = {};
  lastProducts = {};

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    
    const storedProducts = JSON.parse(localStorage.getItem('produse'));
    this.products = storedProducts;
    this.keys = Object.keys(storedProducts);
    console.log(this.products);
    this.productsInCart = this.keys.length;
    
    for(let key of this.keys){
      this.totalPrice = this.totalPrice+(parseInt(this.products[key].pret)* parseInt(this.products[key].cantitate));
      console.log(this.totalPrice);
    }
  }

  clearCart(){
    localStorage.clear();
    this.products = {};
    this.keys = [];
  }

  deleteProdCart(key) {
    delete this.products[key];
    this.keys = this.keys.filter(existingKey => existingKey !== key);
    localStorage.setItem('produse', JSON.stringify(this.products));
    this.totalPrice = 0;
    this.productsInCart = this.keys.length;
    for(let key of this.keys){
      this.totalPrice += parseInt(this.products[key].pret);
    }
    
  }

  doubleProduct(key) {
    let cantProduct = parseInt(this.products[key].cantitate);
    cantProduct += 1;
    this.products[key].cantitate = cantProduct;
    this.totalPrice = 0;
    for(let key of this.keys){
      this.totalPrice = this.totalPrice+(parseInt(this.products[key].pret)* parseInt(this.products[key].cantitate));
      console.log(this.totalPrice);
    }
    localStorage.setItem('produse', JSON.stringify(this.products));

  }

  deleteItemInCart(key) {
    let cantProduct = parseInt(this.products[key].cantitate);
    //console.log(cantProduct, this.products[key].cantitate);
    cantProduct -= 1;
    this.products[key].cantitate = cantProduct;
    this.totalPrice = 0;
    for(let key of this.keys){
      this.totalPrice = this.totalPrice+(parseInt(this.products[key].pret)* parseInt(this.products[key].cantitate));
      console.log(this.totalPrice);
      localStorage.setItem('produse', JSON.stringify(this.products));
    }
  }


  delUndef(item: string){
    item = item.slice(9,item.length)
       return item;
  }
  
  order() {
    for( let key of this.keys){
      this.products[key].stock = this.products[key].stock - this.products[key].cantitate;
      this.products[key].cantitate = 1;
      console.log(this.products[key]);
      
      this.productsService.updateProduct(this.products[key],key).subscribe(resp => {
         this.products[key] = resp;
         console.log('raspunsul',resp, key);
       });
      
    }
    localStorage.clear();
    this.keys = [];
    this.products = {};
    this.productsInCart = 0;
    this.totalPrice = 0;
  }
}
