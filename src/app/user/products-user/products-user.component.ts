import { Component, OnInit } from '@angular/core';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-user',
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.css']
})
export class ProductsUserComponent implements OnInit {

  product: any;

  constructor(private service : FirebaseProductsService) {

this.product = service.getProductData();
   }

   ngOnInit() {
    this.getProductData();
    
  }
 
  getProductData() {
    this.service.getProductData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(product => {
      this.product = product;
    });
  }


}
