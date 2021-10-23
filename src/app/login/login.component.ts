import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestClientService } from '../service/rest-client.service';
import {ToastrService} from 'ngx-toastr';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';

export class AuthReq{
  
  constructor(public username:string,public password:string){

  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authReq : AuthReq;
  invalid: boolean;
  constructor(public toastr:ToastrService,public dataShare:DataShareToastService,public router:Router,public restClienService:RestClientService) { 
    this.authReq = new AuthReq("","");
    this.invalid = false;
  }
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });
  onSubmit(){
    this.authReq = this.loginForm.value;
    this.authReq.password=CryptoJS.SHA1(this.authReq.password).toString();
    this.restClienService.validateUser(this.authReq).subscribe(
      data => {
        this.router.navigate(['']);
        sessionStorage.setItem('token', this.authReq.username);
        this.dataShare.changeMessage("Welcome "+this.authReq.username);
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
