import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from 'src/app/models/Order.model';
import { RequestOrder } from 'src/app/place-orders/place-orders.component';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) { }

  placeOrder(requestOrder: RequestOrder,userName:string) {
    return this.http.post<Orders[]>("http://localhost:8084/orders/", requestOrder,{
      headers:{'Authorization':userName}
    });
  }
  getOrder(userName:string){
    return this.http.get<Orders[]>("http://localhost:8084/orders/",{
      headers:{'Authorization':userName}
    })
  }
}
