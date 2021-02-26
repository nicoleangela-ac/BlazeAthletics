import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css']
})
export class ItemCartComponent implements OnInit {
  items_cart: any[]
  constructor(service: ProductsService) { 
    this.items_cart = service.getItems();
  }

  ngOnInit(): void {
  }

}
