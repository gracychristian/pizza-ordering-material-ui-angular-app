import { Component, Input, OnInit } from '@angular/core';
import { PizzaService } from '../../pizzas.service';
// import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pizza-content',
  templateUrl: './pizza-content.component.html',
  styleUrls: ['./pizza-content.component.css']
})
export class PizzaContentComponent implements OnInit {
  subject = new Subject()
  topping: any;
  @Input() pizzas: any = [];
  closeModal!: string;
  constructor(private _pizzaServices: PizzaService, private dialog: MatDialog) { }
  triggerModal(item: any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose= true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data =  this._pizzaServices ;
    this.printtop();
    
    
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: 'auto',
      data: item
    });    
    this._pizzaServices.senddata(item);
  }

  ngOnInit(): void {
    this.pizzas = this._pizzaServices.getPizzadata()
  }
  printtop() {
    this.topping = this._pizzaServices.getTop();
    console.log(this.topping);
  }

}
