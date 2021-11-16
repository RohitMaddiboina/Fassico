import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/items.model';
import { ListOfItemsList } from 'src/app/models/ListOfItemsList.model';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(public http: HttpClient) { 

  }
  //Items
  getSearchedItems(keyword:string){
     return this.http.get<ListOfItemsList>(Constants.iteServiceUrl+`getItemsKeyword/${keyword}`);
  }
  getItem(itemId: number){
    return this.http.get<Item>(Constants.iteServiceUrl+`getItem/${itemId}`);
  }
  getAllItems(category:string) {
    return this.http.get<ListOfItemsList>(Constants.iteServiceUrl+`getItems/${category}`);
  }
  getItemType(navItem:string,category:string){
    return this.http.get<string[]>(Constants.iteServiceUrl+`getItemType/${navItem}/${category}`);
  }
  getItemsWithItemType(category:string,itemType:string[],low:number,high:number){
    return this.http.post<ListOfItemsList>(Constants.iteServiceUrl+`getItems/${category}/${low}/${high}`,itemType);
  }
}
