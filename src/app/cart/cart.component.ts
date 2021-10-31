import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../models/items.model';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { RestClientService } from '../service/rest-client.service';
import { Carts } from '../models/cart.model';
import { CartService } from '../service/cartService/cart.service';
import { CartCountService } from '../service/CartCountShareServiec/cart-count.service';
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

    cartDetails:Carts[]=[]
    numberOfItemsInCart:number=0;
    userName=this.checkAuthService.getToken();
    totalPrice=Number();
    constructor(private cartService:CartService, private router:Router, public checkAuthService: CheckAuthService,
      public cartCountService:CartCountService) {
     
      if(this.userName!=null){
        this.cartService.getCartItems(this.userName).subscribe(data=>{
          this.cartDetails=data;
        })
      }
      
    }
    ngOnInit(): void {

      this.totalPrice=0;
      if(this.userName!=null){
        this.cartService.getCartItems(this.userName).subscribe(data=>{
          this.cartDetails=data;
       
          for(let c of this.cartDetails){
            if(c.quantity>=0){
              // this.totalPrice=Number(this.totalPrice)
              this.totalPrice=this.totalPrice+(Number(Number(c.item.price)*Number(c.quantity)))
              console.log(this.totalPrice)
            }
          }
        })
        this.cartService.getUSerCartCount(this.userName).subscribe(data=>{
          this.numberOfItemsInCart=data;
        })
       
      }
    }

    addToCart(cart:Carts){
      if(this.userName!=null){
        
        this.cartService.addToCart(cart.item.itemId,this.userName).subscribe(data=>{
          this.ngOnInit();
          this.cartService.getUSerCartCount(this.userName).subscribe(data=>{
            this.cartCountService.changeMessage(data.toString());
          })
        }
        )
      }
      
    }
    removeOneFromCart(cart:Carts){
      if(this.userName!=null){
        console.log("pressed remove one from carrt")
        this.cartService.removeOneFromCart(cart.item.itemId,this.userName).subscribe(data=>{
          this.ngOnInit();
          this.cartService.getUSerCartCount(this.userName).subscribe(data=>{
            this.cartCountService.changeMessage(data.toString());
          })
        })
      }
    }
    remove(cart:Carts){
      if(this.userName!=null){
        
        this.cartService.removeFromCart(cart.item.itemId,this.userName).subscribe(data=>{
          console.log(data)
          this.ngOnInit();
          this.cartService.getUSerCartCount(this.userName).subscribe(data=>{
            this.cartCountService.changeMessage(data.toString());
          })
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
    checkOut(){
      
      this.router.navigate(['placeOrders'])
    }
}
