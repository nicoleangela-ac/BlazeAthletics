import { stringify } from '@angular/compiler/src/util';
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
    this.slides = service.getShopImg();
    this.isLoading = true;
    this.isProductEmpty = false;
  }

  ngOnInit() {
    this.getFeatured();
    this.getBannerImg();
  }

  getFeatured() {
    this.service.getFeatured().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => {
          if(c != null) {
              return (
            { 
              key: c.payload.key,
              name: c.payload.val().name, 
              productImages: c.payload.val().productImages,
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
      this.featuredProducts = datas; 
      this.isLoading = false;

    });
  }

  getBannerImg() {
    this.service.getShopPageImg('banner').valueChanges().subscribe(data => {
    this.slides = data;  } ) } 

}
