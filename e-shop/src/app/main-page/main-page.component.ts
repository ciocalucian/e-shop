import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  title="e-shop";
  products = {};
  keys = [];
  cartKeys = [];
  cartProducts;
  showSuccessMessage: boolean;
  
  constructor(private productsService: ProductsService,private router: Router,
              private modalService: NgbModal ) { }

  
  ngOnInit() {
    this.productsService.getProducts().subscribe(prodResponse => {
      this.products = prodResponse;
      this.keys = Object.keys(prodResponse);
    });

  }

  addToCart(product, key){
    let cartKeys = {}
    if (JSON.parse(localStorage.getItem('produse'))) {
      cartKeys = JSON.parse(localStorage.getItem('produse'));
    }
    cartKeys[key] = product;
    
    localStorage.setItem('produse', JSON.stringify(cartKeys));
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }
  
  viewProductDetails(product, key){ 
    let detailedProduct = {};
    
    detailedProduct[key] = product;

    localStorage.setItem('detail', JSON.stringify(detailedProduct));
    
    this.router.navigate(['/product', key])
    let url: string = "product/" + key;
    this.router.navigateByUrl(url);
    //localStorage.setItem('detail',key);
    // const editModal = this.modalService.open(ProductDetailsComponent);
    // editModal.componentInstance.detailedProduct = product;
    // editModal.result.then(value => { 
    //   console.log(value,product);
    // });
  }

  
}