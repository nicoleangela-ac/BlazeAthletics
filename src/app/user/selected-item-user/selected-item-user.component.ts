import { FirebaseProductsService } from './../../service/firebase-products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"; 

@Component({
  selector: 'app-selected-item-user',
  templateUrl: './selected-item-user.component.html',
  styleUrls: ['./selected-item-user.component.css']
})



export class SelectedItemUserComponent implements OnInit {
 noWrapSlides = false;
 showIndicator = false;
 product: any
 variation: any
 itemSize: any
 id: string
 price : number;
 stock : number;
 isTrue = false;
 isValid = false;
 noItem : number;
 productItem = {
    variationName : '',
    size: '',
    price :  0,
    noItem : 0,
 }

  constructor(private firebaseService: FirebaseProductsService, 
              private actRoute: ActivatedRoute)            
    { this.product = firebaseService.getSingleProduct(this.id); }

    ngOnInit() {
      this.id = this.actRoute.snapshot.paramMap.get('id');  
      this.getProductData() 
      this.productItem.price = null;
      this.productItem.noItem = null;
      this.productItem.noItem = 1;
    }

  incrementQuantity(){
    this.productItem.noItem++
    this.isTrue = false
    if(this.productItem.noItem > this.stock || this.stock == 0){
      this.isValid = true;
      }
    }
  decreaseQuantity(){
    this.productItem.noItem--
    this.isValid = false
    if(this.productItem.noItem < 2 || this.stock == 0)  {
      this.isTrue = true
    }
  }
  getSize(size) {
    this.itemSize = size
    this.getPriceStock()  }

  getVariation(item){
    this.variation = item
    this.getPriceStock();
    }
  getProductData() {
    this.firebaseService.getSingleProduct(this.id).valueChanges().subscribe(data => {
    this.product = data;  } ) }

  getPriceStock () {
    this.isValid = false;
    if(this.itemSize != null && this.variation != null) {
      for(var i in this.product.productVariation) {
        if(this.product.productVariation[i].variationName == this.variation) {
          this.productItem.variationName = this.product.productVariation[i].variationName;
          for(var j in this.product.productVariation[i].variationDetail) {
            if(this.product.productVariation[i].variationDetail[j].size == this.itemSize ) {
                  this.stock = this.product.productVariation[i].variationDetail[j].stock;
                  this.productItem.size = this.product.productVariation[i].variationDetail[j].size;
                  this.productItem.price = this.product.productVariation[i].variationDetail[j].price;
                    if(this.stock == 0 ){ this.isValid = true;}
                } } } } } }

  addToCart() { 
     console.log(this.productItem); }
    } 
  
  

