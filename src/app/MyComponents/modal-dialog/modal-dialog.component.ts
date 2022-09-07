import { Component, Input, OnInit } from '@angular/core';
import { PizzaService } from '../../pizzas.service';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  pizzas: any = [];
  itemsCart: any = [];
  topForm!: FormGroup;
  topping: any = [];

  constructor( private _pizzaservice: PizzaService, private dialogRef: MatDialogRef<ModalDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.CartDetails();
    this.pizzas = this._pizzaservice.getPizzadata()
    this.printtop();
    // this._pizzaservice.getData().subscribe((item:any) => {
    //   this.pizzas = item;
    //   this.itemsCart.push({
    //     productId: this.pizzas.id,
    //     name: this.pizzas.name,
    //     price: this.pizzas.price
    //   });
      this.topForm = this.fb.group({
        topping: [null]
      });
    // });

  }

  getCartDetails: any = [];
  CartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
      this.getCartDetails.filter((pizza:any) => {
        if (pizza.id == this.data.id) {
          this.data.quant = pizza.quant
        }
      })
      // console.log(this.pizzas);
    }
  }

  printtop() {
    this.topping = this._pizzaservice.getTop();
    console.log(this.topping);
    
  }

  inc(piz: any) {
    // console.log(piz);
    if (piz.quant != 10) {
      piz.quant = piz.quant + 1;
    } 
  }
  dec(piz: any) {
    if (piz.quant != 1) {
      piz.quant = piz.quant - 1;
    }
  }

  add_cart(items: any) {
    // console.log(items);
    let cartDataNull = localStorage.getItem('localCart');
    console.log(this.topForm.value);
    
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      items.top = this.topForm.value;
      storeDataGet.push(items);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }
    else {
      var ids = items.id;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '{}');
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(ids) === parseInt(this.itemsCart[i].id)) {
          this.itemsCart[i].top = this.topForm.value;;
          this.itemsCart[i].quant = items.quant;
          index = 1;
          break;
        }
      }
      if (index == -1) {
        items.top = this.topForm.value;
        this.itemsCart.push(items);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumFunc();
    this.close();
  }

  cartNum: number = 0;
  cartNumFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '{}');
    this.cartNum = cartValue.length;
    // console.log(this.cartNum);
  }

  close() {
    this.dialogRef.close();
  }
}