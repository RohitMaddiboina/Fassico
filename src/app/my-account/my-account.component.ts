import { Component, OnInit } from '@angular/core';
import { Orders } from '../models/Order.model';
import { User } from '../models/user.model'; 
import { CartService } from '../service/cartService/cart.service';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { OrdersService } from '../service/orders/orders.service';
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
  orders : Orders[];
  constructor(private userService:UserService,public checkAuthService: CheckAuthService,public orderService:OrdersService) {
    this.user = new User("","","","",new Date(),"","", "","","","","",0,"","","");
    this.email="";
    this.orders = new Array<Orders>();
  }

  ngOnInit() {
    this.email = this.checkAuthService.getToken();
    this.userService.getUser(this.email).subscribe(data => this.user = data,
      error=> JSON.parse(error).message);
    this.orderService.getOrder(this.email).subscribe(data => this.orders = data);
  }
}
