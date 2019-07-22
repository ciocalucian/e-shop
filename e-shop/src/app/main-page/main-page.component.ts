import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  title="e-shop";
  
  constructor(private productsService: ProductsService) { }

  
  ngOnInit() {
     
  }
  

}