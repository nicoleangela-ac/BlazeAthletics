import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';

@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.css']
})
export class OrderPendingComponent implements OnInit {
  product$;
  public isCollapsed = true;

 constructor(private productService: ProductsService) {
    this.product$ = this.productService.getPending();
 }

 ngOnInit() {

 }
}
