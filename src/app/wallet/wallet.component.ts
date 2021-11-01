import { Component, OnInit } from '@angular/core';
import { Orders } from '../models/Order.model';
import { User } from '../models/user.model';
import { CheckAuthService } from '../service/checkAuthService/check-auth.service';
import { OrdersService } from '../service/orders/orders.service';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(public checkAuth: CheckAuthService, public user: UserService, private orderService: OrdersService) { }

  userDetails: any=null
  orders: Orders[] = []
  inActiveOrders: Orders[] = []
  allOrders: Orders[] = []
  paymentList:PaymentMethods[]=[]
  ngOnInit(): void {
    this.userDetails=this.user.getUserDetails(this.checkAuth.getToken()).subscribe(data => {
      this.userDetails=data
      console.log(this.userDetails)
      return data;
    })
    
  this.paymentList=[{
    'methodKey':'WALLET',
    'methodValue':'Wallet'
  },{
    'methodKey':'PAY_ON_DELIVERY',
    'methodValue':'Pay on Delivery'
  }]


    this.orderService.getOrder(this.checkAuth.getToken()).subscribe(data => {
      data.map((d) => {
        d.orderedDate=new Date(d.orderedDate.toString())
        if(d.paymentMethod===this.paymentList[0].methodKey){
          d.paymentMethod=this.paymentList[0].methodValue
        }else{
          d.paymentMethod=this.paymentList[1].methodValue
        }        
        if (!d.refundStatus)
          d.orderCancellationDate = d.orderedDate
          
      })
      this.orders = data
      this.inActiveOrders = data.filter(d => d.refundStatus)
      // this.allOrders = this.orders.concat(this.inActiveOrders).sort((a, b) => {

      //   return Number(new Date(b.orderCancellationDate.toString())) - (Number)(new Date(a.orderCancellationDate.toString()));
      // })
      // console.log(this.allOrders)
      return data
    })
    //  this.orders.sort((a,b){
    //   return a.
    //  })
  }
  
}
export interface PaymentMethods{
  methodKey:String,
  methodValue:String
}
