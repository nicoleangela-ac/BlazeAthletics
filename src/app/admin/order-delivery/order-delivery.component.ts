import { Component, OnInit } from '@angular/core';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { map,take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.css']
})
export class OrderDeliveryComponent implements OnInit {
  UIDdata : any
  orders : any

  constructor(private ordersService : OrdersFirebaseService,private modalService: NgbModal) {
    
   }

  ngOnInit() {
    this.UIDdata = [];
    this.ordersService.getStatusOrder('For Delivery').snapshotChanges().pipe(
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
  update(key:string, value, trackingnum){
    value='PLEase'
 
    this.ordersService.getOrderKey(key).update(key,{ trackingNum: trackingnum, orderStatus: value})
    console.log(this.UIDdata)
  }

}
