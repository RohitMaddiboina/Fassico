import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {ItemsComponent} from './items/items.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { EditSampleComponent } from './edit-sample/edit-sample.component';
import { CartComponent } from './cart/cart.component';
import { GaurdService } from './service/GuardService/gaurd.service';


const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegistrationComponent},
  {path:'item/:navItem/:category',component:ItemsComponent},
  {path:'myAccount',component:MyAccountComponent,canActivate:[GaurdService]},
  {path:'edit',component:EditSampleComponent,canActivate:[GaurdService]},
  {path:'cart',component:CartComponent,canActivate:[GaurdService]},
  {path:'forgot',component:ForgotpasswordComponent},
  {path:'reset',component:ResetpasswordComponent},
  {path:'**',component:ErrorComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }