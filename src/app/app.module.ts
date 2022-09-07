import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './MyComponents/header/header.component';
import { PizzaContentComponent } from './MyComponents/pizza-content/pizza-content.component';
// import { CartComponent } from './MyComponents/cart/cart.component';

import {MatSidenavModule} from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalDialogComponent } from './MyComponents/modal-dialog/modal-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AuthguardServiceService } from './authguard-service.service';
// import { LoginComponent } from './MyComponents/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PizzaContentComponent,
    // CartComponent,
    ModalDialogComponent,
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatSidenavModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '202366826491-ekii3s3t4r458j09t949imfim49jr7nn.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(
            '204042825109707'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  },
  AuthguardServiceService],
  bootstrap: [AppComponent],
  entryComponents:[ModalDialogComponent]
})
export class AppModule { }
