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
      })
      this.transaction=data
    })
    this.userDetails=this.user.getUserDetails(this.checkAuth.getToken()).subscribe(data => {
      this.userDetails=data
      return data;
    })
    
  }
  
}
enum PaymentMethods{
  'WALLET',
  'PAY_ON_DELIVERY'
}
enum TransactionType{
  'DEBIT',
  'CREDIT'
}