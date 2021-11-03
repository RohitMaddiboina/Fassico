import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../cart/cart.component';
import { CartService } from '../service/cartService/cart.service';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { ItemService } from '../service/itemService/item.service';
import { RestClientService } from '../service/rest-client.service';
import {ListOfItemsList} from '../models/ListOfItemsList.model';
import { SearchDataShareServiceService } from '../service/searchDataShare/search-data-share-service.service';
import { CartCountService } from '../service/CartCountShareServiec/cart-count.service';
export class Item{


  constructor(public itemId:number, public itemName:string, public category:string, public itemType:string,public brand:string,
    public model:string,public quanitity:number,public rating:number,public active:boolean,public discription:string,public price:number,public itemImage:string){}
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  cart =  new Cart(0,"",0);
  items:Item[];
  itemTypes:string[];
  checkedItemTypes: Map<string,string>;
  category:string;
  navItem:string;
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 5,
  };
  list:ListOfItemsList;
  pageSize:number;
  selectedPage=0;
  constructor(private activatedRoute: ActivatedRoute,private itemService:ItemService,private cartService:CartService, public dataShare:SearchDataShareServiceService
    ,public toastr: ToastrService,private router:Router,private checkAuthService:CheckAuthService,public cartCountService:CartCountService) {
    this.checkedItemTypes = new Map<string,string>();
    this.items = new Array<Item>();
    this.itemTypes = new Array<string>();
    this.category ="";
    this.navItem ="";
    this.list = new ListOfItemsList(new Array<Array<Item>>());
    this.pageSize = 0;
   }
  
  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);
    this.navItem = this.activatedRoute.snapshot.params['navItem'];
    this.category = this.activatedRoute.snapshot.params['category'];
    this.itemService.getItemType(this.navItem, this.category).subscribe(
      data=> this.itemTypes = data
    )
    this.itemService.getAllItems(this.category).subscribe(
      data => {
        this.list = data;
        this.pageSize = this.list.list.length;
        this.items = this.list.list[0];
        this.options = new Options();
        this.options.floor = this.list.list[0][0].price;
        this.options.ceil =  this.list.list[this.list.list.length - 1][this.list.list[this.list.list.length - 1].length-1].price;
        this.options.step = 5;
        this.value = this.options.floor;
        this.highValue = this.options.ceil;

        // this.items = data;
      }
    )
    this.dataShare.currentMessage.subscribe(message => {
      if(!message.includes("default message")){
        this.itemService.getSearchedItems(message).subscribe(data=>{
  
          this.list = data;
          this.pageSize = this.list.list.length;
          this.items = this.list.list[0];
          
        })
      }
    })

  }
  onChange(itemType:string,event:Event) {
    const ischecked = (<HTMLInputElement>event.target).checked
    if (ischecked){
      this.checkedItemTypes.set(itemType,itemType);
     
      this.itemService.getItemsWithItemType(this.category,[...this.checkedItemTypes.values()],this.value,this.highValue).subscribe(
        data=>{
          this.list = data;
        this.pageSize = this.list.list.length;
        this.items = this.list.list[0];
        }
      );
    }
      else{
        this.checkedItemTypes.delete(itemType);
        this.itemService.getItemsWithItemType(this.category,[...this.checkedItemTypes.values()],this.value,this.highValue).subscribe(
          data=>{
            this.list = data;
        this.pageSize = this.list.list.length;
        this.items = this.list.list[0];
          }
        );  
    }    
  }

  onClick(itemId: number){
    this.router.navigate(['item/'+itemId]);
    this.itemService.getItem(itemId).subscribe(
      data=>console.log(data.discription)
    )
  }
  addToCart(itemId:number){ 
    let username = this.checkAuthService.getToken();
    if(username.length > 1){
      
      this.cart.itemId=itemId;
      this.cart.username= username;
      this.cart.quantity=1;
      
      this.cartService.addToCart(this.cart.itemId,this.cart.username).subscribe(
        data=>{
          this.cartService.getUSerCartCount(this.cart.username).subscribe(data=>{
            this.cartCountService.changeMessage(data.toString());
          })
         
          this.toastr.success("Added to Cart");
          
        },
        err =>{
          if(err.error.includes("Token Expired")){
            this.checkAuthService.logout();
            sessionStorage.setItem("url",this.router.routerState.snapshot['url']);
            this.router.navigate(['/login']);
            this.toastr.warning("Thank you please login again!!");
          }else{
            this.toastr.error("Sorry, Please try again after some time!!");
          }
         
        }
      );
    }else{
      sessionStorage.setItem("url",this.router.routerState.snapshot['url']);
      this.router.navigate(['/login']);
      this.toastr.warning("Thank you, please login");
    }
  }
  OnSliderChange(low:number, high:number){
   
    this.itemService.getItemsWithItemType(this.category,[...this.checkedItemTypes.values()],this.value,this.highValue).subscribe(
      data=>{
        this.list = data;
        this.pageSize = this.list.list.length;
        this.items = this.list.list[0];
      }
    );
    
  }
  page(i:number){
    this.selectedPage = i;
    this.items = this.list.list[i];
  }
  

}