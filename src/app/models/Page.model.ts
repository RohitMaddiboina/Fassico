import { Item } from "./items.model";

export class Page{
    content:Item[];
    last:boolean;
    totalElements:number;
    totalPages: number;
    numberOfElements:number;
    size: number;
    number: 0;
    constructor(){
        this.content = new Array<Item>();
        this.last=false;
        this.totalElements=0;
        this.totalPages=0;
        this.size=0;
        this.number=0;
        this.numberOfElements=0;

    }
}