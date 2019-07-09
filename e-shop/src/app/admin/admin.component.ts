import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = "e-shop";

  constructor(private productsService: ProductsService) { }
  
  showSuccessMessage: boolean;
  formControls = this.productsService.form.controls;


  ngOnInit() {
  } 

  onSubmit() {
    if (this.productsService.form.valid) {
      if (this.productsService.form.get('$key').value == null)
        this.productsService.insertProduct(this.productsService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.productsService.form.reset();
      //this is to be done for proper reset operation
      this.productsService.form.setValue({
        $key: null,
        name: '',
        details: '',
        pret: '',
        cantitate: ''
      });
    }
  }

}