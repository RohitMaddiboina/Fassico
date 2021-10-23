import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../items/items.component';
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
  // tableContent:string='<table >'

  constructor(private activatedRoute:ActivatedRoute,private restClientService:RestClientService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.itemId=params['itemId'];
      console.log(this.itemId);
      this.restClientService.getItem(this.itemId).subscribe(data=>{
        
        this.itemData=data;
        let r:Item;
        r=data;
        
        this.itemDetails=JSON.parse(this.itemData.discription)
        console.log(this.itemDetails)
      //         for(let k in this.itemDetails){
      //          this.tableContent=this.tableContent+'<tr ><td style="border:1px solid black">'+k.toString()+'</td><td>'+this.itemDetails[k]+'</td></tr>';
      //         }
              
      },err=>{
        this.router.navigate(['**'],{skipLocationChange:true})
      });
      // this.tableContent=this.tableContent+'</table>';
    });
  }
  addToCart(itemData:Item){
    // this.cartService.addToCart(itemData.itemId).subscribe(data=>{
    // });
  }
}
