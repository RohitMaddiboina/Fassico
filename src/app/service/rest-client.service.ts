import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carts } from '../models/cart.model';
import { Item } from '../models/items.model';
import { AuthReq } from '../models/AuthReq.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(public http: HttpClient) { }

  //users
  saveUser(user:User){
    return this.http.post("http://localhost:8080/fasscio/save",user);
  }
  validateUser(authReq:AuthReq){
    return this.http.post("http://localhost:8080/fasscio/user-validate/",authReq);
  }
  getUser(email:String|null){
    return this.http.get<User>(`http://localhost:8080/fasscio/get/${email}`);
  }

  
  updateUser(email:String,user:User){
    return this.http.put<User>(`http://localhost:8080/fasscio/update/${email}`,user);
    
  }
  updateAccountDetails(email: String, user: User) {
    
    return this.http.put<User>(`http://localhost:8080/fasscio/updateAccount/${email}`, user);
    
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

  //Carts
  addToCart(itemId:number,username:string,){
    return this.http.post<Carts>(`http://localhost:8081/cart/${itemId}`,"",{
      headers: {'token':username}
    });
  }
  getCartItems(username:string){ 
    
    return this.http.get<Carts[]>('http://localhost:8081/cart/',{
      headers: {'token': username}
    });
  }
 

  removeOneFromCart(itemId: number,userName:string){
    return this.http.delete<Carts>(`http://localhost:8081/cart/${itemId}/-`,{
      headers: {'token': userName}
    });
  }
  removeFromCart(itemId: number,userName:string){
    return this.http.delete<Carts>(`http://localhost:8081/cart/${itemId}`,{
      headers: {'token': userName}
    });
  }
  getUSerCartCount(userName:string){
    return this.http.get<number>(`http://localhost:8081/cart/count`,{
      headers: {'token': userName}
    });
  }
}
