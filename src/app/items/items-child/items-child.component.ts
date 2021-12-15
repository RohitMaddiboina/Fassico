import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart/cart.component';
import { Item } from 'src/app/models/items.model';
import { ListOfItemsList } from 'src/app/models/ListOfItemsList.model';
import { Page } from 'src/app/models/Page.model';
import { CartCountService } from 'src/app/service/CartCountShareServiec/cart-count.service';
import { CartService } from 'src/app/service/cartService/cart.service';
import { CheckAuthService } from 'src/app/service/checkAuthService/check-auth.service';
import { ItemService } from 'src/app/service/itemService/item.service';
import { SearchDataShareServiceService } from 'src/app/service/searchDataShare/search-data-share-service.service';

@Component({
  selector: 'app-items-child',
  templateUrl: './items-child.component.html',
  styleUrls: ['./items-child.component.css']
})
export class ItemsChildComponent implements OnInit {
  cart = new Cart(0, "", 0);
  isSearching:boolean;
  pager: Page;
  items: Item[];
  itemTypes: string[];
  checkedItemTypes: Map<string, string>;
  category: string;
  navItem: string;
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 5,
  };
  list: ListOfItemsList;
  
  @Output("PageSizeChange")
  PageSizeChange : EventEmitter<number> = new EventEmitter
  pageSize: number;
  totalResults: number;
  currentResults: number;
  sortByForm: FormGroup;
  filter: Map<string, number>;
  selectedPage : number;
  
 
  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private itemService: ItemService, private cartService: CartService, public dataShare: SearchDataShareServiceService
    , public toastr: ToastrService, private router: Router, private route: ActivatedRoute, private checkAuthService: CheckAuthService, public cartCountService: CartCountService) {
    this.checkedItemTypes = new Map<string, string>();
    this.items = new Array<Item>();
    this.itemTypes = new Array<string>();
    this.category = "";
    this.navItem = "";
    this.list = new ListOfItemsList(new Array<Array<Item>>());
    this.pageSize = 0;
    this.pager = new Page();
    this.currentResults = 0;
    this.totalResults = 0;
    this.isSearching = false;
    this.selectedPage = 0;
    this.filter = new Map<string, number>([
      ["Low to High", -1],
      ["High to Low", 1]
    ]);
    this.sortByForm = new FormGroup({
      sortByFilter: new FormControl("Low to High")
    });

  }
  loadItems(pageNumber: number) {
    this.isSearching = false;
    this.itemService.getItemsWithItemType(this.category, [...this.checkedItemTypes.values()], this.value, this.highValue, pageNumber).subscribe(
      data => {
        this.pageSize = data.totalPages;
        this.selectedPage = data.number;
        this.PageSizeChange.emit(this.pageSize);
        this.totalResults = data.totalElements;
        this.currentResults = data.numberOfElements;
        data.content.forEach(
          d => {
            let objectURL = 'data:image/jpeg;base64,' + d.primaryImage;
            d.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        );
        this.items = data.content;
      }
    );
   
  }
  ngOnInit(): void {
    this.navItem = this.activatedRoute.snapshot.params['navItem'];
    this.category = this.activatedRoute.snapshot.params['category'];

    this.itemService.getAllItems(this.category).subscribe(
      data => {
        this.options = new Options();
        this.options.floor = 349;
        this.options.ceil = 6000;
        this.value = this.options.floor;
        this.highValue = this.options.ceil;
        this.pageSize = data.totalPages;
        this.selectedPage = data.number;
        this.PageSizeChange.emit(this.pageSize);
        this.totalResults = data.totalElements;
        this.currentResults = data.numberOfElements;
        data.content.forEach(
          d => {
            let objectURL = 'data:image/jpeg;base64,' + d.primaryImage;
            d.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        );
        this.items = data.content;
      }
    )
    
    this.searchImage();

  }
  searchImage(){
    this.dataShare.currentMessage.subscribe(message => {
      if (!message.includes("default message")) {
        this.itemService.getSearchedItems(message,this.selectedPage).subscribe(data => {
          this.isSearching = true;
          data.content.forEach(
            d => {
              let objectURL = 'data:image/jpeg;base64,' + d.primaryImage;
              d.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
          );
          this.items = data.content;
          this.pageSize = data.totalPages;
          this.selectedPage = data.number;
          this.PageSizeChange.emit(this.pageSize);
          this.totalResults = data.totalElements;
          this.currentResults = data.numberOfElements;


        })
      }
    })

  }
  get sortByFilter() {
    return this.sortByForm.get("sortByFilter");
  }
  onSortByFilter(filter: any) {
   

    if (this.filter.has(filter.target.value) && this.filter.get(filter.target.value) == -1) {
      this.items.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
        return 0;
      })
      console.log(this.items);
    } if (this.filter.has(filter.target.value) && this.filter.get(filter.target.value) == 1) {
      this.items.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
      })
    
    }

  }
  onChange(itemType: string, event: Event, pageNumber: number) {
    console.log(pageNumber);
    const ischecked = (<HTMLInputElement>event.target).checked
    if (ischecked) {
      this.checkedItemTypes.set(itemType, itemType);

     
    }
    else {
      this.checkedItemTypes.delete(itemType);
    }
    this.loadItems(pageNumber);
  }

  onClick(itemId: number) {
    this.router.navigate(['item/' + itemId]);
    this.itemService.getItem(itemId).subscribe(
      data => console.log(data.discription)
    )
  }
  addToCart(itemId: number) {
    if (!this.checkAuthService.isUserLoggedIn()) {
      this.router.navigate(['login'], { queryParams: { 'redirectURL': this.router.routerState.snapshot.url } });
    }
    let username = this.checkAuthService.getToken();
    if (username.length > 1) {

      this.cart.itemId = itemId;
      this.cart.username = username;
      this.cart.quantity = 1;

      this.cartService.addToCart(this.cart.itemId, this.cart.username).subscribe(
        data => {
          this.cartService.getUSerCartCount(this.cart.username).subscribe(data => {
            this.cartCountService.changeMessage(data.toString());
          })

          this.toastr.success("Added to Cart");

        },
        err => {
          console.log(this.router)

          console.log(this.route)
          if (err.error.includes("Token Expired")) {
            console.log(this.router)

            // this.checkAuthService.logout();
            this.toastr.warning("Thank you please login again!!");
          } else {
            this.toastr.error("Sorry, Please try again after some time!!");
          }

        }
      );
    } else {
      this.toastr.warning("Thank you, please login");
    }
  }
  OnSliderChange(low: number, high: number, pageNumber: number) {

  
    this.loadItems(pageNumber);
    

  }
  page(i: number) {
    if(!this.isSearching){

      this.loadItems(i);
    }else{
      this.searchImage();
    }

  }
  
}
