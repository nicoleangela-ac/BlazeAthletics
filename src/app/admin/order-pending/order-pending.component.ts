import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { map,take } from 'rxjs/operators';
import {FirebaseProductsService} from './../../service/firebase-products.service'



@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.css']
})
export class OrderPendingComponent implements OnInit {
 
  public isCollapsed = true;
key$;
UIDdata : any
orders : any
product$: any
productdata: any

 constructor(private productService: ProductsService,
            private ordersService : OrdersFirebaseService,
            private modalService: NgbModal,private db: AngularFireDatabase, private firebaseproductservice: FirebaseProductsService) {
 }

 ngOnInit() {
  this.UIDdata = [];
  this.ordersService.getStatusOrder('Pending').snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(datas => {
    this.orders = datas; 
    console.log(this.orders)
  });

  
 }


openVerticallyCentered(content, UID:string) {
  this.UIDdata.pop();
  this.modalService.open(content, { centered: true });
  for(var i in this.orders ) {
    if (UID == this.orders[i].key){
      this.UIDdata.push(this.orders[i] )
      console.log(this.orders)
      console.log(this.orders[i].orderProduct[i].productName)
    }
  }
  


  
  

}
  /*
  this.modalService.open(content, { centered: true });
  this.ordersService.getOrderKey(UID).snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(datas => {
    this.UIDdata = datas; 
    console.log(this.UIDdata)
  });
  */
 

update(key:string, value){
 
 this.ordersService.getOrderKey(key).update(key,{orderStatus: value})
 this.modalService.dismissAll();

 this.firebaseproductservice.getProductData()

 


 console.log(this.UIDdata)
 


}
updatef(){
  

}



}

