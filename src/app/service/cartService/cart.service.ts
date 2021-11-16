import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carts } from 'src/app/models/cart.model';
import { Constants } from '../../../constants'
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public http: HttpClient) { }
  addToCart(itemId:number,username:string,){
    return this.http.post<Carts>(Constants.cartServiceUrl+`/${itemId}`,"",{
      headers: {'Authorization':username}
    });
  }
  getCartItems(username:string){ 
    
    return this.http.get<Carts[]>(Constants.cartServiceUrl+'/',{
      headers: {'Authorization': username}
    });
  }
 

  removeOneFromCart(itemId: number,userName:string){
    return this.http.delete<Carts>(Constants.cartServiceUrl+`/${itemId}/-`,{
      headers: {'Authorization': userName}
    });
  }
  removeFromCart(itemId: number,userName:string){
    return this.http.delete<Carts>(Constants.cartServiceUrl+`/${itemId}`,{
      headers: {'Authorization': userName}
    });
  }
  getUSerCartCount(userName:string){
    return this.http.get<number>(Constants.cartServiceUrl+`/count`,{
      headers: {'Authorization': userName}
    });
  }
}
