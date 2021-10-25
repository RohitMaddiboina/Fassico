import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(public http: HttpClient) { 

  }
  //Items
  getSearchedItems(keyword:string){
     return this.http.get<Item[]>(`http://localhost:8082/getItemsKeyword/${keyword}`);
  }
  getItem(itemId: number){
    return this.http.get<Item>(`http://localhost:8082/getItem/${itemId}`);
  }
  getAllItems(category:string) {
    return this.http.get<Item[]>(`http://localhost:8082/getItems/${category}`);
  }
  getItemType(navItem:string,category:string){
    return this.http.get<string[]>(`http://localhost:8082/getItemType/${navItem}/${category}`);
  }
  getItemsWithItemType(category:string,itemType:string[],low:number,high:number){
    return this.http.post<Item[]>(`http://localhost:8082/getItems/${category}/${low}/${high}`,itemType);
  }
}
