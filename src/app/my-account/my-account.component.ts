import { Component, OnInit } from '@angular/core';
import { User } from '../registration/registration.component';
import { RestClientService } from '../service/rest-client.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user : User;
  email:String | null;
  constructor(private restClientService: RestClientService) {
    this.user = new User("","","","",new Date(),"","", "","","","","",0,"","","");
    this.email="";
  }

  ngOnInit() {
    this.email = sessionStorage.getItem("token");
    this.restClientService.getUser(this.email).subscribe(data => this.user = data);
    console.log(this.user);

      
  }
headers = ["OrderId", "Name", "Date", "Cost", "Wallet Balance"];

rows = [
  {
    "OrderId": "210",
    "Name": "Watch",
    "Date": "21/09/2021",
    "Cost": "Rs 5000",
    "Wallet Balance": "5000"
  },
  {
    "OrderId": "121",
    "Name": "Shoes",
    "Date": "12/08/2021",
    "Cost": "Rs 700",
    "Wallet Balance": "4300"
  },
  {
    "OrderId": "110",
    "Name": "Denim Jacket",
    "Date": "02/08/2021",
    "Cost": "Rs 1000",
    "Wallet Balance": "3300"
  },
  ]
}
