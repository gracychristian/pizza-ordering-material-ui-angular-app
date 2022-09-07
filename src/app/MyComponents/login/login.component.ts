import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm!: FormGroup;
  user!: SocialUser;
  isLoggedin!: boolean ;
  constructor(private authService: SocialAuthService, private router:Router) { }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedin = (user !== null);
      console.log(this.user);
      localStorage.setItem('login', JSON.stringify(this.user));
      this.router.navigate(['/home']);
    });
  }
  loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.router.navigate(['/home']);
  }
  loginWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    if (this.user !== null) {
      // this.authService.signOut();
      localStorage.removeItem('login');
    }
    this.user === null;
  }
  
}
