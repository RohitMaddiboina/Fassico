import { User } from "./user.model";
import { Item } from "./items.model";

export interface Carts {
    cartId: Number,
    user:User,
    item:Item
    quantity: Number
}