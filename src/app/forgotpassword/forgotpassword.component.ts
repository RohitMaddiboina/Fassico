import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestClientService } from '../service/rest-client.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { ToastrService } from 'ngx-toastr';


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
  constructor(public toastr: ToastrService, public dataShare: DataShareToastService, private fb: FormBuilder, public restClienService: RestClientService, public router: Router) {
    this.user = new User("", "", "", "", new Date(), "", "", "", "", "", "", "", 0, "", "", "");
  }

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {

        email: ['', [Validators.required, Validators.email]],
        security_questions: ['', [Validators.required]],
        security_answer: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]

      });

  }
  onSubmit() {
    sessionStorage.setItem('emailId', this.regForm.get('email').value);
    this.email = sessionStorage.getItem('emailId');
    this.restClienService.getUser(this.email).subscribe(res => {

      const q1 = res.security_questions;
      const q2 = res.security_answer;

      if (q1 === this.regForm.get('security_questions').value && q2 === this.regForm.get('security_answer').value) {
        this.isSubmit = true;
      }
      if (this.isSubmit === true) {
        this.router.navigateByUrl('/reset');
      }

    },
      error => {

      });
  }

}
