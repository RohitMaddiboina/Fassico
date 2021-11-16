import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CancellationRequest } from 'src/app/models/CancellationRequest.model';
import { Orders } from 'src/app/models/Order.model';
import { Transactions } from 'src/app/models/transactions.model';
import { RequestOrder } from 'src/app/place-orders/place-orders.component';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) { }

  placeOrder(requestOrder: RequestOrder,userName:string) {
    return this.http.post<Orders[]>(Constants.orderServiceUrl, requestOrder,{
      headers:{'Authorization':userName}
    });
  }
  getOrder(userName:string){
    return this.http.get<Orders[]>(Constants.orderServiceUrl,{
      headers:{'Authorization':userName}
    })
  }
  cancelOrder(userName:string,cancellationRequest: CancellationRequest) {
    return this.http.put<Orders>(Constants.orderServiceUrl,cancellationRequest,{
      headers:{'Authorization':userName}
    })
  }
  getUserTransactions(userName:string){
    return this.http.get<Transactions[]>(Constants.orderServiceUrl+"transactions",{
      headers:{'Authorization':userName}
    })
  }
  getInvoices(userName:string,orderId:String){
    return this.http.get(Constants.orderServiceUrl+`createPdf/${orderId}`,{
      headers:{'Authorization':userName}
    })
  }
}
