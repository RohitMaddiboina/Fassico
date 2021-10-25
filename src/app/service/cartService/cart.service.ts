import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carts } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public http: HttpClient) { }
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
