import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { EditSampleComponent } from './edit-sample/edit-sample.component';
import { CartComponent } from './cart/cart.component';
import { GaurdService } from './service/GuardService/gaurd.service';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { PlaceOrdersComponent } from './place-orders/place-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { WalletComponent } from './wallet/wallet.component';

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
  {path:'item/:itemId',component:ItemComponent},
  {path:'placeOrders',component:PlaceOrdersComponent,canActivate:[GaurdService]},
  {path:'orders',component:OrdersComponent,canActivate:[GaurdService]},
  {path:'wallet',component:WalletComponent,canActivate:[GaurdService]},
  {path:'**',component:ErrorComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
