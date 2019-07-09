import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  title="e-shop";
  
  constructor(private productsService: ProductsService) { }

  productsArray = [];  

  
   ngOnInit() { 
    //  this.productsService.getProducts().valueChanges().subscribe(
    //    list => {
    //      this.productsArray = list.map(item => {
    //         return {
    //           $key: item.key,
    //           ...item.payload.val()
    //         };
    //      });
    //    });
    this.getData();
  }
  getData(){
    this.productsService.getUsers()
    .subscribe(result => {
      this.name = result;
    })
  }

}