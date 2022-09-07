import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './MyComponents/header/header.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./MyComponents/login/login.module')
  .then(m => m.LoginModule)},
  { path: 'cart', loadChildren: () => import('./MyComponents/cart/cart.module')
  .then(m => m.CartModule),canActivate:[AuthenticationGuard]
},
  { path: 'home', component:HeaderComponent,canActivate:[AuthenticationGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
