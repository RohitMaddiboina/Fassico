import { Item } from "./items.model";
import { User } from "./user.model";

export interface Orders{
    "id": Number,
    "orderId": String,
    "quantity": Number,
    "amount": Number,
    "paymentStatus": false,
    "paymentMethod": String,
    "orderedDate": Date,
    "deliveryAddress": String,
    "deliveryStatus": String,
    "orderCancellationStatus": boolean,
    "orderCancellationReason": boolean,
    "orderCancellationDate": Date,
    "refundStatus": boolean,
    "refundDate": boolean,
    "user":User,
    "item":Item,
    "enableToCancelOrder":boolean,
    "canCancelOrderTill":Date
}