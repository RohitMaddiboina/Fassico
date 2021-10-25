import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from '../models/items.model';
import { CartService } from '../service/cartService/cart.service';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { ItemService } from '../service/itemService/item.service';
import { RestClientService } from '../service/rest-client.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  itemId:number=0;
  itemData={} as Item;
  itemDetails:any={};

  constructor(private activatedRoute:ActivatedRoute,public toastr: ToastrService,private itemService:ItemService,private cartService:CartService,private router:Router,public checkAuthService: CheckAuthService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.itemId=params['itemId'];
      console.log(this.itemId);
      this.itemService.getItem(this.itemId).subscribe(data=>{
        this.itemData=data;        
        this.itemDetails=JSON.parse(this.itemData.discription)
        console.log(this.itemDetails)
              
      },err=>{
        this.router.navigate(['**'],{skipLocationChange:true})
      });
    });
  }
  addToCart(itemData:Item){
    // console.log(this.checkAuthService.getToken());
    // this.restClientService.addToCart(itemData.itemId,this.checkAuthService.getToken())
    // this.cartService.addToCart(itemData.itemId).subscribe(data=>{
    // });
    let userName=this.checkAuthService.getToken();;
    if(userName!=null){
      
      this.cartService.addToCart(itemData.itemId,userName).subscribe(
        data=>{
         
          this.toastr.success("Added to Cart");
        },
        err =>{
          console.log(err);
          this.toastr.error("Sorry, Please try again!!");
        }
      );
    }
    
  }
}