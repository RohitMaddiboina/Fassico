import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from '../models/Order.model';
import { Transactions } from '../models/transactions.model';
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

  constructor(public checkAuth: CheckAuthService, public user: UserService, private orderService: OrdersService,private router:Router) { }

  userDetails: any=null
  orders: Orders[] = []
  inActiveOrders: Orders[] = []
  allOrders: Orders[] = []
  paymentList:PaymentMethod[]=[]
  transaction:Transactions[]=[]
  paymentMethods=PaymentMethods
  transactionType=TransactionType
  credit="credit"
  debit="debit"
  ngOnInit(): void {
    this.orderService.getUserTransactions(this.checkAuth.getToken()).subscribe(data=>{
      data.map((d)=>{
        d.dateOfTransaction=new Date(d.dateOfTransaction.toString())
        if(d.paymentMethod==this.paymentMethods[0]){
          d.displayPaymentMethod="Wallet"
        }else if(d.paymentMethod==this.paymentMethods[1]){
          d.displayPaymentMethod="Pay on Delivery"
        }
        if(d.transactionType==this.transactionType[1]){
          d.displaytransactionType=this.credit
        }else if(d.transactionType==this.transactionType[0]){
          d.displaytransactionType=this.debit
        }
        // if()
        // d.paymentMethod=d.paymentMethod.valueOf(d.paymentMethod)
        // if(PaymentMethods.PAY_ON_DELIVERY==d.paymentMethod){
        //   d.paymentMethod="Pay On Delivery"
        // }
      })
      this.transaction=data
      console.log(data);
    })
    // if(!this.checkAuth.isUserLoggedIn()){
    //   this.router.navigate(['login'])
    // }
    this.userDetails=this.user.getUserDetails(this.checkAuth.getToken()).subscribe(data => {
      this.userDetails=data
      // console.log(this.userDetails)
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
export interface PaymentMethod{
  methodKey:String,
  methodValue:String
}
enum PaymentMethods{
  'WALLET',
  'PAY_ON_DELIVERY'
}
enum TransactionType{
  'DEBIT',
  'CREDIT'
}