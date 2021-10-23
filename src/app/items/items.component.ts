import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../cart/cart.component';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { RestClientService } from '../service/rest-client.service';
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
  constructor(private activatedRoute: ActivatedRoute,public restClientService:RestClientService, public dataShare:DataShareToastService
    ,public toastr: ToastrService,private router:Router) {
    this.checkedItemTypes = new Map<string,string>();
    this.items = new Array<Item>();
    this.itemTypes = new Array<string>();
    this.category ="";
    this.navItem ="";
   }
  
  ngOnInit(): void {
    this.navItem = this.activatedRoute.snapshot.params['navItem'];
    this.category = this.activatedRoute.snapshot.params['category'];
    this.restClientService.getItemType(this.navItem, this.category).subscribe(
      data=> this.itemTypes = data
    )
    this.restClientService.getAllItems(this.category).subscribe(
      data => {
        this.items = data;
        this.options = new Options();
        this.options.floor = this.items[0].price;
        this.options.ceil = this.items[this.items.length-1].price;
        this.options.step = 5;
        this.value = this.items[0].price;;
        this.highValue = this.items[this.items.length-1].price;
      }
     
    )
    this.dataShare.currentMessage.subscribe(message => {
      if(!message.includes("default message")){
        this.restClientService.getSearchedItems(message).subscribe(data=>{
  
          this.items = data
          
        })
      }
    })

  }
  onChange(itemType:string,event:Event) {
    const ischecked = (<HTMLInputElement>event.target).checked
    if (ischecked){
      this.checkedItemTypes.set(itemType,itemType);
     
      this.restClientService.getItemsWithItemType(this.category,[...this.checkedItemTypes.values()],this.value,this.highValue).subscribe(
        data=>{
          this.items = data
        }
      );
    }
      else{
        this.checkedItemTypes.delete(itemType);
        this.restClientService.getItemsWithItemType(this.category,[...this.checkedItemTypes.values()],this.value,this.highValue).subscribe(
          data=>this.items = data
        );
      
    }
   
   
    
  }
  // onSearch(keyword:string){ 
   
   
  // }
  // onClick(itemId: number){
  //   this.restClientService.getItem(itemId).subscribe(
  //     data=>console.log(data)
  //   )
  // }
  onClick(itemId: number){
    this.router.navigate(['item/'+itemId],{skipLocationChange:false});
    this.restClientService.getItem(itemId).subscribe(
      data=>console.log(data.discription)
    )
  }
  addToCart(itemId:number){ 
    let username = sessionStorage.getItem('token');
    if(username!=null){
      
      this.cart.itemId=itemId;
      this.cart.username= username;
      this.cart.quantity=1;
      
      this.restClientService.addToCart(this.cart).subscribe(
        data=>{
         
          this.toastr.success("Added to Cart");
        },
        err =>{
          console.log(err);
          this.toastr.error("Sorry, Please try again!!");
        }
      );
    }else{
      this.toastr.warning("Thank you, please login");
    }
  }
  OnSliderChange(low:number, high:number){
   
    this.restClientService.getItemsWithItemType(this.category,[...this.checkedItemTypes.values()],this.value,this.highValue).subscribe(
      data=>this.items = data
    );
    
  }
  

}
