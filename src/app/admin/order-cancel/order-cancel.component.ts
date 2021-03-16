import { Component, OnInit } from '@angular/core';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { map,take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.component.html',
  styleUrls: ['./order-cancel.component.css']
})
export class OrderCancelComponent implements OnInit {
  UIDdata : any
  orders : any
  isLoading = false;
  isOrderEmpty = false;
  constructor(private ordersService : OrdersFirebaseService,private modalService: NgbModal) {
    this.isLoading = true;
    this.isOrderEmpty = false;
   }

  ngOnInit() {
    this.UIDdata = [];
    this.ordersService.getStatusOrder('Cancelled').snapshotChanges().pipe(
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
  }

