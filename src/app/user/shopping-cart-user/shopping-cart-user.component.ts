import { Component, OnInit } from '@angular/core';
import { ProducDataService } from 'src/app/service/product-data.service';

@Component({
  selector: 'app-shopping-cart-user',
  templateUrl: './shopping-cart-user.component.html',
  styleUrls: ['./shopping-cart-user.component.css']
})
export class ShoppingCartUserComponent implements OnInit {

  cartIsEmpty = true;

  constructor(private productService: ProducDataService) { }

  ngOnInit()
  {
    if(this.productService.getProductsData().length != 0)
    {
      this.cartIsEmpty = false;
    }
  }

}
