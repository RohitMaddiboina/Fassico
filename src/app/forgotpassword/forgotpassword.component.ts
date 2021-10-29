import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestClientService } from '../service/rest-client.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/userService/user.service';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  regForm: any;
  email: any;
  isSubmit = false;
  data: any;
  user: User;
  constructor(public toastr: ToastrService, public dataShare: DataShareToastService, private fb: FormBuilder,
    private userService:UserService, public router: Router, public checkAuthService: CheckAuthService) {
    this.user = new User("", "", "", "", new Date(), "", "", "", "", "", "", "", 0, "", "", "");
  }

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {

        email: ['', [Validators.required, Validators.email]],
        securityQuestions: ['', [Validators.required]],
        securityAnswer: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]

      });

  }
  onSubmit() {
    
    this.email = this.regForm.get('email').value;
    const q1 = this.regForm.get('securityQuestions').value;
    const q2 = this.regForm.get('securityAnswer').value;
    this.userService.validateHint(this.email, q1, q2).subscribe(
      data=>{
        sessionStorage.setItem('emailId', this.email);
        this.router.navigateByUrl('/reset');
      },
      
    )
   
  }

}
