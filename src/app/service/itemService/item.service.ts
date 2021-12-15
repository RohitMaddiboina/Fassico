import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/items.model';
import { ListOfItemsList } from 'src/app/models/ListOfItemsList.model';
import { Page } from 'src/app/models/Page.model';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(public http: HttpClient) { 

  }
  //Items
  getSearchedItems(keyword:string,pageNumber:number){
     return this.http.get<Page>(Constants.iteServiceUrl+`getItemsKeyword/${keyword}/${pageNumber}`);
  }
  getItem(itemId: number){
    return this.http.get<Item>(Constants.iteServiceUrl+`getItem/${itemId}`);
  }
  getAllItems(category:string) {
    return this.http.get<Page>(Constants.iteServiceUrl+`getItems/${category}/0`);
  }
  getItemType(navItem:string,category:string){
    return this.http.get<string[]>(Constants.iteServiceUrl+`getItemType/${navItem}/${category}/0`);
  }
  getItemsWithItemType(category:string,itemType:string[],low:number,high:number,pageNumber:number){
    return this.http.post<Page>(Constants.iteServiceUrl+`getItems/${category}/${low}/${high}/${pageNumber}`,itemType);
  }
}
