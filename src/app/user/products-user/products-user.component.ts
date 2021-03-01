import { Component, OnInit } from '@angular/core';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-user',
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.css']
})
export class ProductsUserComponent implements OnInit {

  product: any [];
  products: any;
  tempProduct : any;
  constructor(private service : FirebaseProductsService) {

  this.products=service.getProductData();
   }

   ngOnInit() {
    this.getProductData();
  }
 
  getProductData() {
    this.service.getProductData().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => {
          return (
            { 
              key: c.payload.key,
              name: c.payload.val().name, 
              productImages: c.payload.val().productImages,
              productCategory: c.payload.val().productCategory
            }
          );
        }
        )
      )
    ).subscribe(datas => {
      this.product = (Object.values(datas));
      this.tempProduct = datas;
      console.log(datas)
    });
  }

  getProductCategory(category) {
    this.product.splice(0, this.product.length) 
    for(var i in this.tempProduct ) {
      for ( var j in this.tempProduct[i].productCategory) {
        if (this.tempProduct[i].productCategory[j] == category) {
         this.product.push(this.tempProduct[i] )
        }        
      }
    }
  }


}
