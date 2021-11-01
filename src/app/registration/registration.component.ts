import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestClientService } from '../service/rest-client.service';
import {ToastrService} from 'ngx-toastr'
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { MustMatch } from 'src/must-match.validator';
import { LoginComponent } from '../login/login.component';
import * as CryptoJS from 'crypto-js';
import { User } from '../models/user.model';
import { UserService } from '../service/userService/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
show=false;
  user: User;
  invalid: boolean;

  regForm: any;
  constructor(public toastrService:ToastrService,private fb: FormBuilder,public data:DataShareToastService,  public router: Router,private  userService:UserService) {

    this.user = new User("","","","",new Date(),"","", "","","","","",0,"","","");
    this.invalid = false;
  }
  regex = new RegExp("^[1-9][0-9]{5}$");
  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  emailFormat=   new RegExp("^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

  ngOnInit(): void {

    this.regForm = this.fb.group(
      {
      firstName: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: [''],
      gender:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.strongRegex)]],
      confirmPassword:['',[Validators.required]],
      dob: ['', [Validators.required,this.atLeasteighteen]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[7-9]{1}[0-9]{9}')]],
      houseNo: ['',[Validators.required]],
      street:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      city:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      district:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      state:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      pincode:['',[Validators.required,Validators.pattern(this.regex)]],
      landmark:[''],
      securityQuestions:['',[Validators.required]],
      securityAnswer:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]]

    },{
      validator: MustMatch('password', 'confirmPassword')
  });

  }

  hide = true;
  hide1 = true;
  get passwordInput() { return this.regForm.get('password'); }
  get confirmPasswordInput() { return this.regForm.get('confirmPassword'); }

  atLeasteighteen(FormControl: AbstractControl): ValidationErrors | null{
    if(FormControl.value == null){
      return null;
    }
    const birthday=new Date(FormControl.value)
    const birthdayYear=birthday.getFullYear()
    const currentYear=new Date().getFullYear()
    if(currentYear-birthdayYear<18){
      return {'invalidAge':true}
    }
    return null;
  }

  onSubmit() {
    this.user = this.regForm.value;
    console.log(this.user)
    this.user.password=CryptoJS.SHA1(this.user.password).toString();


    this.userService.saveUser(this.user).subscribe(
      data => {
        this.invalid = false;
        this.router.navigate(['login']);
        this.data.changeMessage("Account created!!")
      },
      error => {
        this.invalid = true;
        this.toastrService.error("Account Already Exists..!");

      },
      () => {

        //this.router.navigate(['/login']);
      }

    )

  }


  get f() {
    return this.regForm.controls;
  }
  changeGender(e:any) {
    console.log(e.target.value);
  }

  // checkDob(date: any): void {
  //   let date1 = new Date(date);
  //   let timeDiff = Math.abs(Date.now() - date1.getTime());
  //   let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  //   if (age >= 18) {
  //     this.is18 = true;
  //   } else {
  //     this.is18 = false;
  //   }
  // }

}
