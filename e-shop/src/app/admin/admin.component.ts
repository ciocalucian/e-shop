import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  title = "e-shop";
  products = {};
  keys = [];
  productForm;
  updatedKey = "";
  showDeletedMessage: boolean;
  showSuccessMessage: boolean;

  
  constructor(public productsService: ProductsService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.productsService.getProducts().subscribe(prodResponse => {
      this.products = prodResponse;
      this.keys = Object.keys(prodResponse);
    });

    this.productForm = this.formBuilder.group({
      cantitate: '',
      details: '',
      imageUrl: '',
      pret: '',
      name: ''
    });
 }

 onDelete(key) {
  /// array -> map, filter, forEach -> es6 array functions
  this.productsService.deleteProduct(key).subscribe(resp => {
    console.log("raspuns stergere produs", resp); 
    this.keys = this.keys.filter(existingKey => existingKey !== key);
  });
  this.showDeletedMessage = true;
  setTimeout(() => this.showDeletedMessage = false, 3000);
 }
 
 

  onSubmit() {

    const newProduct = {
      cantitate: parseInt(this.productForm.value.cantitate, 10),
      name: this.productForm.value.name,
      imageUrl: this.productForm.value.imageUrl,
      details: this.productForm.value.details,
      pret: parseInt(this.productForm.value.pret, 10),
    }
    this.productsService.createProduct(newProduct).subscribe(resp => {
      this.products[resp['name']] = newProduct;
      this.keys.push(resp['name']);
      //console.log("response from create product", resp, this.products); 
    });
    this.productForm = this.formBuilder.group({
      cantitate: '', 
      name: '',
      imageUrl: '',
      details: '',
      pret: '',
    });
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);

  }
    
  onEdit(product, key) {
    this.productsService.getProduct(product, key).subscribe(resp => {
      console.log("PUT call successful value returned in body",resp, key);
    this.productForm = this.formBuilder.group(resp);
    this.updatedKey = key;
    console.log(this.updatedKey);
    });
  }

  onUpdate(){
    const newProduct = {
      cantitate: parseInt(this.productForm.value.cantitate, 10),
      name: this.productForm.value.name,
      imageUrl: this.productForm.value.imageUrl,
      details: this.productForm.value.details,
      pret: parseInt(this.productForm.value.pret, 10),
    }

    this.productsService.updateProduct(newProduct,this.updatedKey).subscribe( updateProdResp => {
      this.products[this.updatedKey] = updateProdResp;
      //this.keys[this.updatedKey] = updateProdResp;
      //console.log("Updated product",this.updatedKey,updateProdResp,this.keys,this.products);
      this.updatedKey = "";
    });
  }

}