import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {

  @Input() _product: any;
  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
              private productService: ProductsService) { }
  product = {}
  productForm;
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      cantitate: '', 
      name: '',
      imageUrl: '',
      details: '',
      pret: '',
    });

    this.product = this._product;
    console.log("this.product in edit modal component", this.product);
    this.productForm.setValue(this.product);
  }

  onUpdate() {
    this.activeModal.close(this.productForm.value);
  }

}
