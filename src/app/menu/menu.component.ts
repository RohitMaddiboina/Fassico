import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsComponent } from '../items/items.component';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import { RestClientService } from '../service/rest-client.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchDataShareServiceService } from '../service/searchDataShare/search-data-share-service.service';

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
export class MenuComponent implements OnInit {

  searchForm:any;
  search : SearchBox;
  // itemsComponent : ItemsComponent; 
  constructor(private activatedRoute: ActivatedRoute,public restClientService:RestClientService, public checkLogin:CheckAuthService, 
    public fb:FormBuilder,public dataShare:SearchDataShareServiceService) { 
    this.search = new SearchBox("");
    // this.filteredOptions = new Observable();
    // this.itemsComponent = new ItemsComponent(this.activatedRoute,this.restClientService);
  }
  // name = 'Angular 6';
  // myControl = new FormControl();
  // options: word[] = [
  //   { name: 'Mary' },
  //   { name: 'Masy' },
  //   { name: 'Maty' },
  //   { name: 'Mvry' },
  //   { name: 'Mbry' },
  //   { name: 'Shelley' },
  //   { name: 'Igor' }
  // ];
  // filteredOptions: Observable<word[]>;


  // displayFn(user?: word): string  {
  //   return user ? user.name : "undefined";
  // }

  // private _filter(name: string): word[] {
  //   const filterValue = name.toLowerCase();

  //   return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  // }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      'search': ['',[Validators.minLength(3)]]
    })
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //   startWith<string | word>(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(name => name ? this._filter(name) : this.options.slice())
    //   );
  }
  onSearch(){
    this.search = this.searchForm.value;
    this.dataShare.changeMessage(this.search.search);
  }

}
