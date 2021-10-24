
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../items/items.component';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { RestClientService } from '../service/rest-client.service';
import { Carts } from './cart.model';
export class Cart{
  constructor(public itemId:number,public username:string,public quantity:number) { }
}
// export class CartDetails{
//   constructor(public username:string,public item:Item[]){}
// }
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 
  // cartDetails: CartDetails;

  // constructor(public restClientService: RestClientService, public checkAuthService: CheckAuthService) {
  //   this.cartDetails = new CartDetails("", new Array<Item>());
  // }

  // ngOnInit(): void {
  //   if (this.username !== null) {
  //     this.restClientService.getCartItems(this.username).subscribe(
  //       data => {
  //         this.cartDetails = data;
  //         //   this.items = this.cartDetails.item;
  //         //  console.log( this.cartDetails.item);
  //       }
  //     )
  //   }
  // }
    cartDetails:Carts[]=[]
    numberOfItemsInCart:number=0;
    userName=this.checkAuthService.getToken();
    constructor(private restClientService:RestClientService, private router:Router, public checkAuthService: CheckAuthService) {
      // cartService.getCartByUserid().subscribe(data=>{
      //   this.cartDetails=data;
      // })
      // restClientService.getCartItems()

      if(this.userName!=null){
        this.restClientService.getCartItems(this.userName).subscribe(data=>{
          this.cartDetails=data;
        })
      }
      
    }
    ngOnInit(): void {
      if(this.userName!=null){
        this.restClientService.getCartItems(this.userName).subscribe(data=>{
          this.cartDetails=data;
        })
        this.restClientService.getUSerCartCount(this.userName).subscribe(data=>{
          this.numberOfItemsInCart=data;
        })
        // for(let c of this.cartDetails){
        //   if(c.quantity<=0){
        //     this.numberOfItemsInCart=this.numberOfItemsInCart+c.quantity.valueOf();
        //   }
        // }
      }
    }

    addToCart(cart:Carts){
      
      if(this.userName!=null){
        this.restClientService.addToCart(cart.item.itemId,this.userName).subscribe(data=>{
          this.ngOnInit();
        })
      }
      
    }
    removeOneFromCart(cart:Carts){
      if(this.userName!=null){
        this.restClientService.removeOneFromCart(cart.item.itemId,this.userName).subscribe(data=>{
          this.ngOnInit();
        })
      }
    }
    remove(cart:Carts){
      if(this.userName!=null){
        this.restClientService.removeFromCart(cart.item.itemId,this.userName).subscribe(data=>{
          this.ngOnInit();
        })
      }
      // this.cartService.removeFromCart(cart.item.itemId).subscribe(data=>{
      //   this.ngOnInit();
      // })
    }
    deleteFromCart(cart:Carts){
      // this.cartService.removeFromCart(cart.item.itemId).subscribe(data=>{
      //   this.ngOnInit();
      // })
    }
}
