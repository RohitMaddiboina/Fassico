import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsComponent } from '../items/items.component';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { RestClientService } from '../service/rest-client.service';

export class SearchBox{

  constructor(public search: string){

  }
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  searchForm:any;
  search : SearchBox;
  // itemsComponent : ItemsComponent; 
  constructor(private activatedRoute: ActivatedRoute,public restClientService:RestClientService, public checkLogin:CheckAuthService, 
    public fb:FormBuilder,public dataShare:DataShareToastService) { 
    this.search = new SearchBox("");
    // this.itemsComponent = new ItemsComponent(this.activatedRoute,this.restClientService);
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      'search': ['',[Validators.minLength(3)]]
    })
  }
  onSearch(){
    this.search = this.searchForm.value;
    this.dataShare.changeMessage(this.search.search);
  }

}