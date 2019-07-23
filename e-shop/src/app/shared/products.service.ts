import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  backendApiUrl = 'https://e-shop-e.firebaseio.com';

  getProducts() {
    return this.http.get(`${this.backendApiUrl}/produse.json`);
  }

  deleteProduct(key) {
    // console.log("product in delete function", key);
    return this.http.delete(`${this.backendApiUrl}/produse/${key}.json`);
  }

  updateProduct(product, key) {
    //console.log('product in edit function', product, key);
    return this.http.put(`${this.backendApiUrl}/produse/${key}.json`, product);
  } 
  createProduct(product) {
    return this.http.post(`${this.backendApiUrl}/produse.json`, product);
  }


  getProduct(product, key){
    return this.http.get(`${this.backendApiUrl}/produse/${key}.json`,product)
  }
  

}
