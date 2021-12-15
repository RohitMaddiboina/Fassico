import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsComponent } from '../items/items.component';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { RestClientService } from '../service/rest-client.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchDataShareServiceService } from '../service/searchDataShare/search-data-share-service.service';
import { CartService } from '../service/cartService/cart.service';
import { CartCountService } from '../service/CartCountShareServiec/cart-count.service';
import { UserService } from '../service/userService/user.service';
import { DomSanitizer } from '@angular/platform-browser';

export class SearchBox{

  constructor(public search: string){

  }
}
export class word{
  constructor(public name: string){}
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit,DoCheck {

  searchForm:any;
  search : SearchBox;
  CartItemCount:string;
  profilePicture:any;
  constructor(private activatedRoute: ActivatedRoute,public restClientService:RestClientService, public checkLogin:CheckAuthService, 
    public fb:FormBuilder,public dataShare:SearchDataShareServiceService,public cartService:CartService,public cartCountService:CartCountService,
    public userService:UserService,private sanitizer: DomSanitizer) { 
    this.search = new SearchBox("");
    this.CartItemCount = '0';
  }
 
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      'search': ['',[Validators.minLength(3)]]
    })
     this.cartService.getUSerCartCount(this.checkLogin.getToken()).subscribe(data => {
      this.CartItemCount = data.toString();
    });
    this.cartCountService.currentMessage.subscribe(message=>{
      this.CartItemCount = message;
    });
  }
  ngDoCheck() : void{
    this.profilePicture = this.userService.getProfilePictureFromLocalStorage();
  }
  onSearch(){
    this.search = this.searchForm.value;
    this.dataShare.changeMessage(this.search.search);
  }

}
