import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service'
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';

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

  
  constructor(public productsService: ProductsService, private formBuilder: FormBuilder,
    private modalService: NgbModal) { }
  
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

    // this.productForm = 
    // this.productForm.setValue(resp)
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);

  }
    
  onEdit(product, key) {
    //localStorage.setItem('editProductModal', JSON.stringify(product));
    const editModal = this.modalService.open(EditProductModalComponent);
    editModal.componentInstance._product = product;
   editModal.result.then(value => { 
    console.log(value);
    //salvezi update service
    this.productsService.updateProduct(value,key).subscribe(resp => {
      this.products[key] = resp;
      console.log('raspunsul',resp, key);
    });
   });
  
   // iei valaorea produsului si trimiti la function onupdate
    // apelezi functia de update din product service cu valoarea produsului care
    // iti vine pe resultatl modalei


    // this.productsService.getProduct(product, key).subscribe(resp => {
    //   console.log("PUT call successful value returned in body",resp, key);
    // this.productForm = this.formBuilder.group(resp);
    // this.updatedKey = key;
    // console.log(this.updatedKey);
    // });
  }

  // onUpdate(){
   
  //   this.productsService.updateProduct(value,this.updatedKey).subscribe( updateProdResp => {
  //     this.products[this.updatedKey] = updateProdResp;
  //     //this.keys[this.updatedKey] = updateProdResp;
  //     //console.log("Updated product",this.updatedKey,updateProdResp,this.keys,this.products);
  //     this.updatedKey = "";
  //   });
  // }

}