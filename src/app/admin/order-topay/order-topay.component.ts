import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { map,take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-topay',
  templateUrl: './order-topay.component.html',
  styleUrls: ['./order-topay.component.css']
})
export class OrderTopayComponent implements OnInit {
  product$;
  public isCollapsed = true;
  UIDdata : any
  orders : any

  constructor(private productsService: ProductsService,private ordersService : OrdersFirebaseService,private modalService: NgbModal ) { 
   // this.product$ = this.productsService.getToPay();
  }
  ngOnInit() {
    this.UIDdata = [];
  this.ordersService.getStatusOrder('To Pay').snapshotChanges().pipe(
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
        console.log(this.UIDdata)
      
    }}
  }
  update(key:string, value){
 
    this.ordersService.getOrderKey(key).update(key,{orderStatus: value})
    console.log(this.UIDdata)
  }
}