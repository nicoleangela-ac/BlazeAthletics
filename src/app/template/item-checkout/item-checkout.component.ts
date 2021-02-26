import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-item-checkout',
  templateUrl: './item-checkout.component.html',
  styleUrls: ['./item-checkout.component.css']
})
export class ItemCheckoutComponent implements OnInit {

  items_checkout: any[]
  constructor(service: ProductsService) { 
    this.items_checkout = service.getItems();
  }

  ngOnInit(): void {
  }

}
