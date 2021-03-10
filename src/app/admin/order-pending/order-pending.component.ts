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


 constructor(private productService: ProductsService, private modalService: NgbModal,private db: AngularFireDatabase) {
    this.product$ = this.productService.getPending();
    this.key$= this.productService.getPendingKEY();
 }

 ngOnInit() {
 


  
}
openVerticallyCentered(content) {
  this.modalService.open(content, { centered: true });
  this.db.list
  

}

}
