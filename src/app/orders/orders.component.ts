import { Component, OnInit } from '@angular/core';
import { Orders } from '../models/Order.model';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { OrdersService } from '../service/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService:OrdersService,private checkAuth:CheckAuthService) { }

  orders:Orders[]=[]
  cancelledOrders:Orders[]=[]
  ngOnInit(): void {
    this.orderService.getOrder(this.checkAuth.getToken()).subscribe(data=>{
      this.orders=data;
      console.log(data);
      this.cancelledOrders=data.filter(d=>d.orderCancellationStatus)
    })
  }

}
