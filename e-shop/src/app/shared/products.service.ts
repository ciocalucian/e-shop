import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firebase: AngularFireDatabase) { }
  productsList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    details: new FormControl(''),
    pret: new FormControl(''),
    cantitate: new FormControl('')
  });
 
  getProducts(){
    this.productsList = this.firebase.list('produse');
    return this.productsList.snapshotChanges();
  }
  insertProduct(product){
    this.productsList.push({
      name: product.name,
      details: product.details,
      pret: product.pret,
      cantitate: product.cantitate
    });

  }
  
  populateForm(product){
    this.form.setValue(product);
  }

  updateProduct(product){
    this.productsList.update(product.$key,
      { 
        name: product.name,
        details: product.details,
        pret: product.pret,
        cantitate: product.cantitate
      });
  }

}
