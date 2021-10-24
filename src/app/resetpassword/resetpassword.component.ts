import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/must-match.validator';
import { User } from '../models/user.model';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { RestClientService } from '../service/rest-client.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  regForm: any;
  email: any;
  user1: User;
  constructor(private fb: FormBuilder, public restClienService: RestClientService,
    public data: DataShareToastService, public toastr: ToastrService) 
    { this.user1 = new User("", "", "", "", new Date(), "", "", "", "", "", "", "", 0, "", "", ""); }
  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  ngOnInit(): void {
    this.regForm = this.fb.group(
      {

        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.strongRegex)]],
        confirmPassword: ['', [Validators.required]],
        security_answer: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]

      }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }
  hide = true;
  hide1 = true;
  get passwordInput() { return this.regForm.get('password'); }
  get confirmPasswordInput() { return this.regForm.get('confirmPassword'); }


  onSubmit() {
    this.email = sessionStorage.getItem('emailId');

    this.restClienService.getUser(this.email).subscribe(res => this.user1 = res);

    

    this.user1.password = CryptoJS.SHA1(this.regForm.get('password').value).toString(); 
   // this.user1.email=this.email;

    // console.log("--------nullllllll------email----"+this.user1.email+" ---city -----"+this.user1.city+"password----d"+this.user1.password+" email ");
   
    this.restClienService.updateUser(this.email, this.user1).subscribe(res => {
      this.data.changeMessage("reset Completed");
    } )

}
}