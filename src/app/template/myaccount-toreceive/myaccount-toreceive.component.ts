import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';


@Component({
  selector: 'app-myaccount-toreceive',
  templateUrl: './myaccount-toreceive.component.html',
  styleUrls: ['./myaccount-toreceive.component.css']
})
export class MyaccountToreceiveComponent implements OnInit {
  items_toreceive: any[]
  constructor(service: ProductsService) { 
    this.items_toreceive = service.getItems();
  }
  ngOnInit(): void {
  }

}
