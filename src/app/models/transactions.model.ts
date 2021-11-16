import { Orders } from "./Order.model";

export interface Transactions {
    "amount": number
    "dateOfTransaction": Date
    "id": number
    "order": Orders
    "transactionType":TransactionType,
    "displaytransactionType":string,
    "paymentMethod":PaymentMethods,
    "displayPaymentMethod":string
}
enum PaymentMethods{
    'Wallet'='WALLET',
    'PAy_ON_DELIVERY'="PAY_ON_DELIVERY"
}
enum TransactionType{
    'DEBIT'="DEBIT",
    'CREDIT'="CREDIT"
}