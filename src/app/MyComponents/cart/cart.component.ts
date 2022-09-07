import { Component, OnInit } from '@angular/core';
import { RazpayService } from '../../razpay.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  dataRefresher: any;
  strikeCheckout: any = null;
  handler: any = null;
  razor: any;
  constructor(  private router: Router,
    private razorpayService: RazpayService) { }

  ngOnInit(): void {
    this.CartDetails();
    this.totalCartAmt();
    this.refreshData();
    this.loadStripe();
  }
  getCartDetails: any = [];
  CartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      // console.log(this.getCartDetails);
    }
  }

  deleteItem(id: any) {
    // console.log(id);
    this.getCartDetails.splice(id, 1);
    localStorage.setItem("localCart", JSON.stringify(this.getCartDetails, id));
  }

  decQnt(id: any, qnt: any) { 
    console.log(id, qnt);
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {
        if (qnt != 1) {
          this.getCartDetails[i].quant = parseInt(qnt) - 1;
        }
      }
    }
    localStorage.setItem("localCart", JSON.stringify(this.getCartDetails));
  }

  incQnt(id: any, qnt: any) {
    // console.log(id, qnt);

    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {
        if (qnt != 10) {
          this.getCartDetails[i].quant = parseInt(qnt) + 1;
        }
      }
    }
    localStorage.setItem("localCart", JSON.stringify(this.getCartDetails));
  }

  total: number = 0;
  totalCartAmt() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
      this.total = this.getCartDetails.reduce(function (acc: any, val: any) {
        return acc + ((val.price + val.top.topping.price) * val.quant);
      }, 0);
    }
  }

  refreshData() {
    this.dataRefresher =
      setInterval(() => {
        this.totalCartAmt();
      }, 800);
  }

  // --------------checkout by stripe code starts here ------------------------

  stripePay(amount: any) {
    // localStorage.setItem("localCart", JSON.stringify(this.getCartDetails));
    // alert("Order Successfull")
    // checkout(amount : any) {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JP2x2SJ5E9HaqeebjXNlK0OwEXY70pnaBV2b7D0GEOP7g4Imu55YWO97r1Od8CGvhmZuk23Vrd9izi7Wa7vXd7K00NsKxUm88',
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        // console.log(token)
        alert('Token Created!!');
        localStorage.removeItem('userdata');
        this.router.navigate(['../']);


      }
    });

    this.handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });

  }

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JP2x2SJ5E9HaqeebjXNlK0OwEXY70pnaBV2b7D0GEOP7g4Imu55YWO97r1Od8CGvhmZuk23Vrd9izi7Wa7vXd7K00NsKxUm88',
          locale: 'auto',
          token: (token: any) => {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }
 
  //  ---------------------RazorPay code starts here------------------------

  RAZORPAY_OPTIONS: any = {
    "key": "rzp_test_UMj0sPyM0ICIqK",
    "amount": "total * 100",
    "currency": "INR",
    "name": "Small Pizza",
    "order_id": "",
    "handler": function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    },
    "description": "Load Pizza",
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "prefill": {
      "name": "Gracy",
      "email": "",
      "contact": "",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };


  razPay(total: any) {
    console.log(total);
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);
    this.RAZORPAY_OPTIONS.amount = total * 100;
    this.razor = new this.razorpayService.nativeWindow.Razorpay(this.RAZORPAY_OPTIONS);
    this.razor.open();
  }

  razorPaySuccessHandler(response: any) {
    console.log(response);
    alert('Payment Successfull')
  }




}
