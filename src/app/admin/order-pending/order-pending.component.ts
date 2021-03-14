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
soldproduct:any
totalstock:any

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
      this.UIDdata.push(this.orders[i])
      this.key$=UID;
      
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
this.product$=this.UIDdata 

 for(var i in this.orders ) {
  if (this.key$ == this.orders[i].key){
    this.product$.push(this.orders[i])


this.firebaseproductservice.getProductName(this.orders[i].orderProduct[0].productName).snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ key: c.payload.key, ...c.payload.val() })
    )
  )
).subscribe(data => {
  this.productdata = data;
 // console.log(this.productdata)

 this.soldproduct = this.productdata[0].soldProducts + 1;
 this.totalstock = this.productdata[0].totalStock - 1;

 //console.log(this.productdata[0].name)

 this.firebaseproductservice.getProductName(this.productdata[0].name).update(this.productdata[0].key, {soldProducts: this.soldproduct, totalStock: this.totalstock})
});

this.modalService.dismissAll();
this.ngOnInit()



}
 }}
 
updatef(key:string, value){
this.ordersService.getOrderKey(key).update(key,{orderStatus: value})
this.modalService.dismissAll();

}



}

