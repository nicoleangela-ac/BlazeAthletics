import { Component, OnInit } from '@angular/core';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-user',
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.css']
})
export class ProductsUserComponent implements OnInit {
  isLoading = false;
  isProductEmpty = false;
  product: any [];
  products: any;
  tempProduct : any;
  constructor(private service : FirebaseProductsService) {
    this.isLoading = true;
    this.products=service.getProductData();
  }

   ngOnInit() {
    this.getProductData();
  }
 
  getProductData() {
    this.service.getProductData().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => {
          if(c != null) {
              return (
            { 
              key: c.payload.key,
              name: c.payload.val().name, 
              productImages: c.payload.val().productImages,
              productCategory: c.payload.val().productCategory,
            }
          );  
        }
        else {
          this.isProductEmpty = true;
          this.isLoading = true;
        }
        return this.isLoading = false;
        }
        )
      )
    ).subscribe(datas => {
      this.product = Object.values(datas);
      this.tempProduct = datas;
      this.isLoading = false;

    });
  }
  getAllProduct() {
    this.isProductEmpty = false;
    this.product.splice(0, this.product.length) 
    for(var i in this.tempProduct ) {
    this.product.push(this.tempProduct[i]) 
  }
  if(this.product.length <= 0) {
    this.isProductEmpty = true;
  }
  }

  getProductCategory(category) {
    this.isProductEmpty = false;
    this.product.splice(0, this.product.length) 
    for(var i in this.tempProduct ) {
      for ( var j in this.tempProduct[i].productCategory) {
        if (this.tempProduct[i].productCategory[j] == category) {
         this.product.push(this.tempProduct[i] )
        }        
      }
    }
    if(this.product.length <= 0) {
      this.isProductEmpty = true;
    }
  }


}
