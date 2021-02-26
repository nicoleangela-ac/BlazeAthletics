import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';


@Component({
  selector: 'app-myaccount-topay',
  templateUrl: './myaccount-topay.component.html',
  styleUrls: ['./myaccount-topay.component.css']
})
export class MyaccountTopayComponent implements OnInit {

  items_topay: any[]
  constructor(service: ProductsService) { 
    this.items_topay = service.getItems();
  }
  ngOnInit(): void {
  }

}
