import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() detailedProduct: any;

  constructor() { }
  product = {};

  ngOnInit() {
    this.product = this.detailedProduct;
    console.log(this.product);
  }

}
