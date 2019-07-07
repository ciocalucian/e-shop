import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = "e-shop";

  public list = [];

  public nume = '';
  public details = '';
  public pret = '';
  public cantitate = '';

  constructor() {

  }

  ngOnInit() {
  
  } 

  addItem() {
    const item = {
      nume: this.nume,
      details: this.details,
      pret: this.pret,
      cantitate: this.cantitate
    }
    this.list.push(item);
    this.nume = '';
    this.details = '';
    this.pret = '';
    this.cantitate = '';
    console.log(this.list);
  }
}
