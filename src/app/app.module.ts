import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatSelectModule} from '@angular/material/select'
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatButtonModule} from '@angular/material/button';
// import {MatChipsModule} from '@angular/material/chips';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { SampleComponent } from './sample/sample.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ItemsComponent } from './items/items.component';
import { EditSampleComponent } from './edit-sample/edit-sample.component';
import { CartComponent } from './cart/cart.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    SampleComponent,
    SideNavBarComponent,
    ItemsComponent,
    FooterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    MyAccountComponent,
    EditSampleComponent,
    CartComponent,
    ItemComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      preventDuplicates:false,
      positionClass:'toast-bottom-right',
    }),NgxSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    // MatButtonModule,
    // MatSelectModule,
    // MatCheckboxModule,
    // MatChipsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
