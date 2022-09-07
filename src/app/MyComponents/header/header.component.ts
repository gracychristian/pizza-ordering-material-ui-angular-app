import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PizzaService } from 'src/app/pizzas.service';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output() public sidenavToggle = new EventEmitter();
  isHandset: Observable<BreakpointState> = this.breakpointobserver.observe(Breakpoints.Handset);
  isSort: any;
  pizzas!: PizzaService[];
  seacrhTerm: string = ''
  pizzaToView!: PizzaService[];
  search: any;
  cartItem: number = 0;
  dataRefresher: any;
  screenWidth!: number;
  user: any = [];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private breakpointobserver: BreakpointObserver, private _pizzaServices: PizzaService, private socialAuthService: SocialAuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

    this.mobileQuery.removeListener(this._mobileQueryListener);

    this.user = JSON.parse(localStorage.getItem('login')!);
    console.log(this.user);


    this.pizzas = this._pizzaServices.getPizzadata()
    this.pizzas = this.pizzas
    this.pizzaToView = this.pizzas.filter(p => p.name.toLowerCase().includes(this.seacrhTerm.toLowerCase()))

    this.cartItemFunc();
    this.refreshData();
  }
  sortPizza() {
    console.log(this.isSort);
    if (this.isSort) {
      this.pizzas.sort((a, b) => b.popularity - a.popularity)
    }
    else {
      this.pizzas.sort((a, b) => a.popularity - b.popularity)
    }
    this.isSort = !this.isSort

  }
  searchChange(id: any) {
    this.seacrhTerm = id.target.value
    this.pizzaToView = this.pizzas.filter(p => p.name.toLowerCase().includes(this.seacrhTerm.toLowerCase()))
  }

  cartItemFunc() {
    if (localStorage.getItem('localCart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('localCart')!);
      this.cartItem = cartCount.length;
    }
  }

  logOut(): void {
    if (this.user !== null) {
      // this.socialAuthService.signOut();
      localStorage.removeItem('login');
      }
      this.user === null;
  }


  refreshData() {
    this.dataRefresher =
      setInterval(() => {
        this.cartItemFunc();
      }, 800);
  }

}
