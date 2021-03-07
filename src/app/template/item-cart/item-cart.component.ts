import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataModel } from 'src/app/models/product-data-model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartWriteData } from 'src/app/service/cart-write-data.service';
import { ProducDataService } from 'src/app/service/product-data.service';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css']
})
export class ItemCartComponent implements OnInit {

  items_cart: ProductDataModel[] = [];
  cartIsEmpty = true;
  isLoading = false;

  constructor(private productService: ProducDataService, 
    private router: Router,
    private cartService: CartWriteData,
    private authService: AuthenticationService) {}

  ngOnInit()
  {
    this.isLoading = false;
    this.cartService.getCartData(this.authService.userToken).subscribe(response => {

        if(response != null)
        {
          this.cartIsEmpty = false;
          this.items_cart = response;
          this.productService.setProductData(response);
          console.log(this.productService.getProductsData());
        }
        this.isLoading = false;
      }
    );
  }

  onRemove(index: number)
  {
    this.productService.deleteProduct(index);
    console.log(this.productService.getProductsData());
    this.isLoading = true;

    this.cartService.putCartData(this.authService.userToken).subscribe
    (
      response => 
      {
       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/shopping-cart']);
       })
      }
    );

    if(this.items_cart.length === 0)
    {
      this.cartIsEmpty = true;
    }
  }

  onProceed()
  {
    console.log(this.items_cart);
    this.router.navigate(['/check-out']);
  }
}
