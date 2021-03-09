import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
 ],
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  isLoading = false;
  isProductEmpty = false;
  noWrapSlides = false;
  showIndicator = true;
  products : any;
  product: any[];
  featuredProducts: any[];
  slides: any;

  constructor( private service : FirebaseProductsService) {
    this.products = service.getProductData();
    this.slides = service.getShopImg();
    this.isLoading = true;
    this.isProductEmpty = false;
  }

  ngOnInit() {
    this.getProductData();
    this.getBannerImg();
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
        return this.isLoading = false;
        }
        )
      )
    ).subscribe(datas => {
      this.product = Object.values(datas);
      for(var i in this.product ) {
        for ( var j in this.product[i].productCategory) {
          if (this.product[i].productCategory[j] == "Featured") {
           this.featuredProducts.push(this.product[i] )
          }        
        }
      }
    });
  }

  getBannerImg() {
    this.service.getShopPageImg('banner').valueChanges().subscribe(data => {
    this.slides = data;  } ) } 

}
