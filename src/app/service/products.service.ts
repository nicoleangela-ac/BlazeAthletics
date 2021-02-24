import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  product: any[] = [
    {'img': '../../assets/images/Product1.jpg',"name": "Item 1"},
    {'img': '../../assets/images/Product3.jpg',"name": "Item 2"},
    {'img': '../../assets/images/Product5.png',"name": "Item 3"},]
  items_cart: any[] = [
    {'img': '../../assets/images/Product1.jpg','title':'JACKET', 'size':'LARGE', 'color':'BLACK', 'noItem':'1', 'price':'300.00'},
    {'img': '../../assets/images/Product3.jpg','title':'JERSEY', 'size':'LARGE', 'color':'BLACK', 'noItem':'1', 'price':'300.00'},
  ]
getProduct() {
   return this.product;
}
getItems() {
  return this.items_cart;
}

   
}
