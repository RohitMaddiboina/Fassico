import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestClientService } from '../service/rest-client.service';
import {ToastrService} from 'ngx-toastr';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { AuthReq } from '../models/AuthReq.model';
import { UserService } from '../service/userService/user.service';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { AuthResponse } from '../models/AuthResponse.model';
import { CartCountService } from '../service/CartCountShareServiec/cart-count.service';
import { CartService } from '../service/cartService/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authReq : AuthReq;
  authRes : AuthResponse;
  invalid: boolean;
  constructor(public toastr:ToastrService,public dataShare:DataShareToastService,public router:Router,private userService:UserService,
    public checkAuthService: CheckAuthService,public cartCountService:CartCountService,public cartService:CartService) { 
    this.authReq = new AuthReq("","");
    this.authRes = new AuthResponse("");
    this.invalid = false;
  }
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });
  onSubmit(){
    this.authReq = this.loginForm.value;
    this.authReq.password=CryptoJS.SHA1(this.authReq.password).toString();
    this.userService.validateUser(this.authReq).subscribe(
      data => {
        this.router.navigate(['']);
        this.authRes = data;
      
        
        this.checkAuthService.setToken(this.authRes.token);
        this.dataShare.changeMessage("Welcome "+this.authReq.username);
        this.cartService.getUSerCartCount(this.checkAuthService.getToken()).subscribe(data => {
         this.cartCountService.changeMessage(data.toString());
        });
        this.invalid = false;
      },
      error =>{
        this.invalid=true;
        this.toastr.error('Incorrect Username or password')
      },
    );
  }
  get f(){
    return this.loginForm.controls;
  }
  ngOnInit(): void {
 
      this.dataShare.currentMessage.subscribe(message =>{
        if(!message.includes("default")){

          this.toastr.success(message);
        }
      } )
  
  }

}
