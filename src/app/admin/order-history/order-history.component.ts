import { Component, OnInit } from '@angular/core';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import {ProductsService} from 'src/app/service/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { map,take } from 'rxjs/operators';
import {FirebaseProductsService} from './../../service/firebase-products.service'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  UIDdata : any
orders : any
productComments : any[]
productCondition: any[] 
isLoading = false;
isOrderEmpty = false;

  constructor(private productService: ProductsService,
    private ordersService : OrdersFirebaseService,
    private modalService: NgbModal,private db: AngularFireDatabase, private firebaseproductservice: FirebaseProductsService) 
    {
      this.isLoading = true;
      this.isOrderEmpty = false;
     }

  ngOnInit() {
    this.productComments = [];
    this.productCondition= [];
    this.UIDdata = [];
  this.ordersService.getStatusOrder('Completed').snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(datas => {
    this.orders = datas; 
    console.log(this.orders)
    this.isLoading = false
    if(this.orders.length == 0 ) {
      this.isOrderEmpty = true
    }
  });

  
 }

 openVerticallyCentered(content, UID:string) {
  this.UIDdata.pop();
  this.productCondition.slice();
  this.productComments.slice();
  this.modalService.open(content, { centered: true });
  for(var i in this.orders ) {
    if (UID == this.orders[i].key){
      this.UIDdata.push(this.orders[i])
      console.log(this.orders[i].feedback)
    }
  }

  

  
}


  }


