import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  title = "e-shop";


  constructor(public productsService: ProductsService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.productsService.form.controls;

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    if (this.productsService.form.valid){
       if (this.productsService.form.get('$key').value == null)
        this.productsService.insertProduct(this.productsService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.productsService.form.reset();
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