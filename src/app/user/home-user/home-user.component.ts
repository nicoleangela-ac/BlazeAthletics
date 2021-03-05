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
  noWrapSlides = false;
  showIndicator = true;
  products : any;
  product: any[];
  slides: any;

  constructor( private service : FirebaseProductsService) {
    this.products = service.getProductData();
    this.slides = service.getShopImg();
    this.isLoading = true;
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
              name: c.payload.val().name, 
              productImages: c.payload.val().productImages,
            }
          );
        }
        return this.isLoading = false;
        }
        )
      )
    ).subscribe(datas => {
      this.product = Object.values(datas);
    });
  }

  getBannerImg() {
    this.service.getShopPageImg('banner').valueChanges().subscribe(data => {
    this.slides = data;  } ) } 
}
