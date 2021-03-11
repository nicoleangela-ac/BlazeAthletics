import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  AngularFireObject } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersFirebaseService {
  private dbPathOrders = '/ordersData';
  private dbPathCart = '/cartData'
  ordersRef: AngularFireList<any[]> = null;
  cartRef: AngularFireList<any[]> = null;
  constructor(private db: AngularFireDatabase) {
    this.ordersRef = db.list(this.dbPathOrders);
    this.cartRef = db.list(this.dbPathCart);
   }

   //query for orders data
  createOrder(order: any[]): void {  
     this.ordersRef.push(order)
  }
  getOrdersData(): AngularFireList<any[]> {
    return this.ordersRef;
  }

  deletecart(key: string): Promise<any> {
    return this.cartRef.remove(key);
  }

  getUserOrder(UID: string): AngularFireList<any> {  
    return this.db.list(this.dbPathOrders, ref => ref.orderByChild('customerId').equalTo(UID));
  }

  getStatusOrder(Status: string): AngularFireList<any> {  
    return this.db.list(this.dbPathOrders, ref => ref.orderByChild('orderStatus').equalTo(Status));
  }

  getOrderKey(UID: string): AngularFireList<any> {  
    return this.db.list(this.dbPathOrders, ref => ref.orderByKey().equalTo(UID));
  }
}
