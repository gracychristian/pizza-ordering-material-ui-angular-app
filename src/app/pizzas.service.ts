import { Injectable } from '@angular/core';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  [x: string]: any;
  pizzadata: any = [
    { id: 1, name: 'Margherita Pizza', img: 'https://static.uengage.in/uploads/5/image-581856-1595939022.jpeg', price: 110, popularity: 2, quant:1},
    { id: 2, name: 'Double Cheese Margherita', img: 'https://static.uengage.in/uploads/5/image-581856-1595939022.jpeg', price: 155, popularity: 5, quant:1},
    { id: 3, name: 'Lovers Bite Pizza', img: 'https://static.uengage.in/uploads/5/image-1578568887.jpeg', price: 155, popularity: 3, quant:1},
    { id: 4, name: 'Garden Delight Pizza', img: 'https://static.uengage.in/uploads/5/image-571627-1595939023.jpeg', price: 155, popularity: 6, quant:1},
    { id: 5, name: 'Paneer Tikka Butter Masala Pizza', img: 'https://static.uengage.in/uploads/5/image-1578568992.jpeg', price: 205, popularity: 7, quant:1},
    { id: 6, name: 'Peri Peri Veg Pizza', img: 'https://static.uengage.in/uploads/5/image-1578569029.jpeg', price: 225, popularity: 4, quant:1},
    { id: 7, name: 'Cheezy-7 Pizza', img: 'https://static.uengage.in/uploads/5/image-1578568978.jpeg', price: 205, popularity: 1, quant:1},
    { id: 8, name: 'Farm Villa Pizza', img: 'https://static.uengage.in/uploads/5/image-827281-1595939023.jpeg', price: 180, popularity: 9, quant:1},
    { id: 9, name: 'Veg Tamer Pizza', img: 'https://static.uengage.in/uploads/5/image-1578569630.jpeg', price: 265, popularity: 10, quant:1},
    { id: 10, name: 'Hot Passion Pizza', img: 'https://static.uengage.in/uploads/5/image-1578569568.jpeg', price: 225, popularity: 8, quant:1}
  ];
  
  getPizzadata() : any {
    return this.pizzadata
  }
  subject = new Rx.BehaviorSubject("");
  senddata (product: any) {
    this.subject.next(product)
  }
  getData() {
    return this.subject.asObservable();
  }

  top: any = [
    {id: 0, name: 'none', price: 0},
    {id: 1, name: 'Onion', price: 15},  
    {id: 2, name: 'Tomato', price: 20},
    {id: 3, name: 'Extra Cheese', price: 25},
    {id: 4, name: 'Baby Corns', price: 25},
    {id: 5, name: 'Olives', price: 25},
    {id: 6, name: 'Mushroom', price: 25},
    {id: 7, name: 'Paneer', price: 25},
    ]
    getTop() {
      return this.top;
    }


}

