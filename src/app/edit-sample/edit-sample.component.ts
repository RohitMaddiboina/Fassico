import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { RestClientService } from '../service/rest-client.service';
import { UserService } from '../service/userService/user.service';

export class UserEdit{
  constructor(
   public firstName: string,
   public lastName: string,
   public email: string,
   public phone: string,
   public houseNo: string,
   public street:string,
   public city: string,
   public district: string,
   public gender: string,
   public state: string,
   public pincode: number,
   public dob:Date
  ){}
}
@Component({
  selector: 'app-edit-sample',
  templateUrl: './edit-sample.component.html',
  styleUrls: ['./edit-sample.component.css']
})
export class EditSampleComponent implements OnInit {

 
 regForm: any;
 
 id: string;
 isAddMode: boolean;
 loading = false;
 submitted = false;
 userRepo:UserEdit;
street:string;
regex = new RegExp("^[1-9][0-9]{5}$");
  constructor(
   
    private fb: FormBuilder, public restClienService: RestClientService,
      private route: ActivatedRoute,
      private router: Router,
      private userService:UserService,
      private toast: ToastrService,
      private checkAuthService:CheckAuthService
      
      
  ) {
    this.id = "";
      this.isAddMode = false;
      this.street="";
      this.userRepo = new UserEdit("","","","","","","","","","",0,new Date());
     
   
  }

  ngOnInit() {
    this.regForm = this.fb.group(
      {
      firstName: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: [''],
      email:[''],
      gender:['',[Validators.required]],
      dob: ['', [Validators.required,this.atLeasteighteen]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[7-9]{1}[0-9]{9}')]],
      houseNo: ['',[Validators.required]],
      street:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      city:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      district:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      state:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      pincode:['',[Validators.required,Validators.pattern(this.regex)]],
      landmark:[''],
    

    });

     
    if (!this.isAddMode) {
      this.userService.getUser(this.checkAuthService.getToken()).subscribe(
        data => {
          this.userRepo.firstName = data.firstName;
          this.userRepo.lastName = data.lastName;
          this.userRepo.email = data.email;
          this.userRepo.phone = data.phone;
          this.userRepo.street = data.street;
          this.userRepo.houseNo = data.houseNo;
          this.userRepo.city = data.city;
          this.userRepo.district = data.district;
          this.userRepo.state = data.state;
          this.userRepo.pincode =data.pincode;
          this.userRepo.dob = data.dob;
          this.userRepo.gender = data.gender;
          this.regForm.patchValue(this.userRepo);
        }
      );
       
    }
     

     
  }
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
  changeGender(e:any) {
    console.log(e.target.value);
  }
   // convenience getter for easy access to form fields
   get f() { return this.regForm.controls; }

   onSubmit() {
      
       this.updateUser();
       
   }

  

   private updateUser() {
    //  console.log(this.form.value());

     this.userService.updateAccountDetails(this.checkAuthService.getToken(), this.regForm.value).subscribe({
      next: () => {
         
         
          this.toast.success('User updated',);
      },
      error: error => {
        this.toast.warning("Update failed");
          
      }
  });


   }




 

  

}
