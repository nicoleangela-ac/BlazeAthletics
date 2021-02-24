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

  noWrapSlides = false;
  showIndicator = true;
  product: any;
  slides: any ;

  constructor( private service : FirebaseProductsService) {
      this.product = service.getProductData();
      this.slides = service.getShopImg();

  }

   ngOnInit() {
    this.getProductData();
    this.getShopImg();

  }
 
  getProductData() {
    this.service.getProductData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.product = customers;
    });
  }

  getShopImg() {
    this.service.getShopImg().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(images => {
      this.slides= images;
    });
  }

}
