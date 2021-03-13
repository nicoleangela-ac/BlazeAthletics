import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  AngularFireObject, AngularFireAction } from '@angular/fire/database';

import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  items$;

  constructor(private db: AngularFireDatabase) { 
  }

  getToPay() {
    return this.db.list('/ordersData', query => query.orderByChild('orderStatus').equalTo('To Pay'))
   .snapshotChanges()
   .pipe(map( action => action
    .map(a=>{
      const data =a.payload.val();
      return data;})))
  }

   

  getPending() {
    return this.db.list('/ordersData', query => query.orderByChild('orderStatus').equalTo('Pending'))
   .snapshotChanges()
   .pipe(map( action => action
    .map(a=>{
       const key = a.payload.key
       const data= a.payload.val()
    return data})))
    }

    getPendingKEY() {
      return this.db.list('/ordersData', query => query.orderByChild('orderStatus').equalTo('Pending'))
     .snapshotChanges()
     .pipe(map( action => action
      .map(a=>{
         const key = a.payload.key
        console.log(key)
      return key})))
      }

      


  }
  