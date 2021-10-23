import { Component, OnInit } from '@angular/core';
import { Item } from '../items/items.component';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { RestClientService } from '../service/rest-client.service';
export class Cart{
  constructor(public itemId:number,public username:string,public quantity:number) { }
}
export class CartDetails{
  constructor(public username:string,public item:Item[]){}
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 username = this.checkAuthService.getToken();
 items = new Array<Item>();
 cartDetails:CartDetails;
  constructor(public restClientService:RestClientService,public checkAuthService:CheckAuthService) { 
    this.cartDetails = new CartDetails("",new Array<Item>());
   
  }

  ngOnInit(): void {
    if(this.username!==null){
      this.restClientService.getCartItems(this.username).subscribe(
        data => {
            this.cartDetails = data;
          //   this.items = this.cartDetails.item;
          //  console.log( this.cartDetails.item);
        }
      )
    }
  }

}
