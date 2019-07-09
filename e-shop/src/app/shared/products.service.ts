import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firebase: AngularFireDatabase) { }
  productsLits: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl(''),
    details: new FormControl(''),
    pret: new FormControl(''),
    cantitate: new FormControl('')
  });

  getProducts() {
    this.productsLits = this.firebase.list('produse');
    return this.productsLits;
  }

  getUsers(){
    return this.db.collection('produse').snapshotChanges();
  }


  insertProduct(produs) {
    if(!this.productsLits){
      this.productsLits = this.getProducts();
    }
    this.productsLits.push({
      name: produs.name,
      details: produs.details,
      pret: produs.pret,
      cantitate: produs.cantitate
    });
  }

  

}
