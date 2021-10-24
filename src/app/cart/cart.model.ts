import { User } from "../registration/registration.component";
import { Item } from "../items/items.component";

export interface Carts {
    cartId: Number,
    user:User,
    item:Item
    quantity: Number
}