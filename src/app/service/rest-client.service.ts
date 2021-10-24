import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Cart } from '../cart/cart.model';
import { Cart } from '../cart/cart.component';
import { Carts } from '../cart/cart.model';
// import { Items } from '../item/items.module';
import { Item } from '../items/items.component';
import { AuthReq } from '../login/login.component';
import { User } from '../registration/registration.component';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(public http: HttpClient) { }

  //userw
  saveUser(user:User){
    return this.http.post("http://localhost:8082/fasscio/save",user);
  }
  validateUser(authReq:AuthReq){
    return this.http.post("http://localhost:8082/fasscio/user-validate/",authReq);
  }
  getUser(email:String|null){
    return this.http.get<User>(`http://localhost:8082/fasscio/get/${email}`);
  }

  getSearchedItems(keyword:string){
     return this.http.get<Item[]>(`http://localhost:8082/getItemsKeyword/${keyword}`);
  }

  updateUser(email:String,user:User){
    return this.http.put<User>(`http://localhost:8082/fasscio/update/${email}`,user);
    ///fasscio/update/{email}
  }
  updateAccountDetails(email: String, user: User) {

    return this.http.put<User>(`http://localhost:8082/fasscio/updateAccount/${email}`, user);
    
  }

  //Items
  // getItem(itemId: number){
  //   return this.http.get<Item>(`http://localhost:8082/getItem/${itemId}`);
  // }
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
  

  getCartItems(username:string){ 
    // return this.http.get<CartDetails>(`http://localhost:8081/fasscio/cart/get`,{
    //   headers: {'token': username}
    // });
    return this.http.get<Carts[]>('http://localhost:3001/cart/settykranthi1@gmail.com/')
  }

  addToCart(itemId: number,userName:string){
    // number,userName:string|null
    // return this.http.post<Cart>(`http://localhost:8081/fasscio/cart/add`,null);
    return this.http.post<Cart>(`http://localhost:3001/cart/${userName}/${itemId}`,null);
  }
  removeOneFromCart(itemId: number,userName:string){
    return this.http.delete<Cart>(`http://localhost:3001/cart/${userName}/${itemId}/-`);
  }
  removeFromCart(itemId: number,userName:string){
    return this.http.delete<Cart>(`http://localhost:3001/cart/${userName}/${itemId}`);
  }
}
