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
    // console.log(this.products[key].pret,parseInt(this.products[key].pret)+1);
    // let doubleItem = 1;

    // this.products[key + doubleItem] = product;
    // this.keys.push(key+doubleItem);
    // doubleItem += 1;
    // console.log(this.products);
    // localStorage.setItem('produse', JSON.stringify(this.products));
    // this.totalPrice += parseInt(this.products[key].pret);
    // this.productsInCart += 1;  
    let cantProduct = parseInt(this.products[key].cantitate);
    //console.log(cantProduct, this.products[key].cantitate);
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
    

    //console.log(this.keys, this.products);
     for ( let i = 0; i < this.keys.length;i++) {
        //console.log(this.products[this.keys[i]].name);
        const productName = this.products[this.keys[i]].name;
        // this.orderedProducts[productName] = '+';
        this.orderedProducts.push(productName);  
     }
     //console.log(this.orderedProducts);
     for ( let i = 0; i < this.orderedProducts.length; i++ ){
      this.orderItems[this.products[this.keys[i]].name] = this.orderItems[this.products[this.keys[i]].name] +'1';
     }
     //console.log(this.orderItems);
     
     for (let x in this.orderItems) {
       this.orderItems[x] = this.delUndef(this.orderItems[x]);
       this.orderItems[x] = this.orderItems[x].length;
     }
     console.log(this.orderItems);
     for (let k = 0; k < this.keys.length; k++) {
       for ( let z = k+1; z < this.keys.length;z++){
         if(this.products[this.keys[k]] == this.products[this.keys[z]]) {
          this.keys.slice(k+1,k+2);
          k++;
        } else {
          this.lastProducts[this.keys[k]] = '1';
        }

       }
     }
     console.log(this.lastProducts);
  }
lastOrder( ){
  // put to bd /produse/key/cantitate: cantitate
  // post /comenzi/key/{
  //                    data:            
  //                    data:            
  //                    data:            
  //                    data:            
  //                    data:            
  //}
}

}
