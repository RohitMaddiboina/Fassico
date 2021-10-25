import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model'; 
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { RestClientService } from '../service/rest-client.service';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user : User;
  email: string;
  constructor(private userService:UserService,public checkAuthService: CheckAuthService) {
    this.user = new User("","","","",new Date(),"","", "","","","","",0,"","","");
    this.email="";
  }

  ngOnInit() {
    this.email = this.checkAuthService.getToken();
    this.userService.getUser(this.email).subscribe(data => this.user = data,
      error=> JSON.parse(error).message);
  }
}
