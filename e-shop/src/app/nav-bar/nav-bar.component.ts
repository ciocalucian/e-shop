import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  title = 'E-shop';
  keys = [];
  products = {};
  items = 0;

  constructor() { }

  ngOnInit() {
    const detailProd =  JSON.parse(localStorage.getItem('produse'));
   this.products = detailProd;
   this.keys = Object.keys(detailProd);
   this.items = this.keys.length;
  }

}
