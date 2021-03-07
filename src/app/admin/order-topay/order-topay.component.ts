import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';

@Component({
  selector: 'app-order-topay',
  templateUrl: './order-topay.component.html',
  styleUrls: ['./order-topay.component.css']
})
export class OrderTopayComponent implements OnInit {
  product$;
  public isCollapsed = true;

  constructor(private productsService: ProductsService ) { 
    this.product$ = this.productsService.getToPay();
  }
  ngOnInit(): void {
  }
}