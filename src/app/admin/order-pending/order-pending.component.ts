import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.css']
})
export class OrderPendingComponent implements OnInit {
  product$;
  public isCollapsed = true;
  key$;
orders : any

 constructor(private productService: ProductsService,
            private ordersService : OrdersFirebaseService,
            private modalService: NgbModal,private db: AngularFireDatabase) {
  //  this.key$= this.productService.getPendingKEY();
  //  this.ordersService.getStatusOrder('Pending');
 }

 ngOnInit() {
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


openVerticallyCentered(content) {
  this.modalService.open(content, { centered: true });
  this.db.list
  console.log(content)

}

}
