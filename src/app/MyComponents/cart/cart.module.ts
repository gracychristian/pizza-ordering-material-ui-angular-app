import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        CartRoutingModule,
        MatButtonModule,
        MatIconModule,

    ],
    declarations: [CartComponent]
})
export class CartModule { }