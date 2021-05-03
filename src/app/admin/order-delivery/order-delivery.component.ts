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
  isLoading = false;
  isOrderEmpty = false;

  constructor(private ordersService : OrdersFirebaseService,private modalService: NgbModal) {
      this.isLoading = true;
      this.isOrderEmpty = false;
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
      this.isLoading = false
      if(this.orders.length == 0 ) {
        this.isOrderEmpty = true
      }
    });
  }

  update(key:string, value, trackingnum){

    this.ordersService.getOrderKey(key).update(key,{ trackingNum: trackingnum.value, orderStatus : value});
    //console.log(trackingnum.value)
    this.modalService.dismissAll();

  }

  openVerticallyCentered(content, UID:string) {
    this.UIDdata.pop();
    this.modalService.open(content);
    for(var i in this.orders ) {
      if (UID == this.orders[i].key){
        this.UIDdata.push(this.orders[i] )
        console.log(this.UIDdata)
      
    }}
  }

  errorMessage(content) {
    this.modalService.open(content, { centered: true });
  }

  modalopen(viewmodal, UID:string) {
    this.UIDdata.pop();
    this.modalService.open(viewmodal, { centered: true });
    for(var i in this.orders ) {
      if (UID == this.orders[i].key){
        this.UIDdata.push(this.orders[i] )
        console.log(this.UIDdata)
      
    }}
  }

}
