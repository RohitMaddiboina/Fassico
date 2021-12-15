import { Options } from '@angular-slider/ngx-slider';
import { Component, DoCheck, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../cart/cart.component';
import { CartService } from '../service/cartService/cart.service';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { ItemService } from '../service/itemService/item.service';
import { RestClientService } from '../service/rest-client.service';
import { ListOfItemsList } from '../models/ListOfItemsList.model';
import { SearchDataShareServiceService } from '../service/searchDataShare/search-data-share-service.service';
import { CartCountService } from '../service/CartCountShareServiec/cart-count.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../models/Page.model';
import { ItemsChildComponent } from './items-child/items-child.component';
export class Item {


  constructor(public itemId: number, public itemName: string, public category: string, public itemType: string, public brand: string,
    public model: string, public quanitity: number, public rating: number, public active: boolean, public discription: string, public price: number, public itemImage: string, public primaryImage: any) { }
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
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
  pageSize: number;
  totalResults: number;
  currentResults: number;
  sortByForm: FormGroup;
  filter: Map<string, number>;
  selectedPage = 0;

  @ViewChild('child') child : ItemsChildComponent;

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
    this.filter = new Map<string, number>([
      ["Low to High", -1],
      ["High to Low", 1]
    ]);
    this.sortByForm = new FormGroup({
      sortByFilter: new FormControl("Low to High")
    });
    this.child = new ItemsChildComponent(sanitizer,activatedRoute,itemService,cartService,dataShare,toastr,router,route,checkAuthService,cartCountService);

  }


  ngOnInit(): void {

    this.navItem = this.activatedRoute.snapshot.params['navItem'];
    this.category = this.activatedRoute.snapshot.params['category'];
    this.itemService.getItemType(this.navItem, this.category).subscribe(
      data => this.itemTypes = data
    )

   
    
      

  }


 
  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }
}