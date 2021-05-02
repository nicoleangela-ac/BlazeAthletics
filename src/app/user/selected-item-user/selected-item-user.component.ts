import { FirebaseProductsService } from './../../service/firebase-products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from "@angular/router"; 
import { ProducDataService } from 'src/app/service/product-data.service';
import { ProductDataModel } from 'src/app/models/product-data-model';
import { CartWriteData } from 'src/app/service/cart-write-data.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

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
 isTrue : boolean;
 isValid : boolean;
 isOutOfStock: boolean;
 isLoad= false;
 isChecking = false;
 noItem : number;
 isLoading = false;
 message: string = null;
 error: string = null;

 productItem = {
    productImages: '',
    productName: '',
    productId : '',
    variationName : '',
    size: '',
    price :  0,
    noItem : 0,
 }

  constructor(private firebaseService: FirebaseProductsService, 
              private actRoute: ActivatedRoute,
              private productService: ProducDataService,
              private cartService: CartWriteData,
              private authService: AuthenticationService,
              private router: Router)            
    {
      console.log(firebaseService.getSingleProduct(this.id));
      this.product = firebaseService.getSingleProduct(this.id); 
      this.isLoad = true;
    }

    ngOnInit() {
      this.isOutOfStock = true;
      this.isTrue = true;
      this.isValid = true;
      this.id = this.actRoute.snapshot.paramMap.get('id');  
      this.getProductData() 
      this.productItem.price = null;
      this.productItem.noItem = null;
      this.productItem.noItem = 1;
    }

  incrementQuantity(){
    this.isTrue = false
    this.productItem.noItem++ 
    if(this.productItem.noItem >= this.stock || this.stock == 0){
      this.isValid = true;
      }
    }
  decreaseQuantity(){
    this.isValid = false
    this.productItem.noItem--

    if(this.productItem.noItem <= 1 || this.stock == 0)  {
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
    this.product = data;  
    this.isLoad = false;
    } ) }

  getPriceStock () {
    this.isValid = false;
    this.isTrue = false;
    this.isOutOfStock =false;
    if(this.itemSize != null && this.variation != null) {
      for(var i in this.product.productVariation) {
        if(this.product.productVariation[i].variationName == this.variation) {
          this.productItem.variationName = this.product.productVariation[i].variationName;
          for(var j in this.product.productVariation[i].variationDetail) {
            if(this.product.productVariation[i].variationDetail[j].size == this.itemSize ) {
                  this.stock = this.product.productVariation[i].variationDetail[j].stock;
                  this.productItem.size = this.product.productVariation[i].variationDetail[j].size;
                  this.productItem.price = this.product.productVariation[i].variationDetail[j].price;
                    if(this.stock == 0 ){ this.isValid = true; this.isOutOfStock = true;}
                } } } } } }

  addToCart() 
  { 
  this.error = null;
  this.isChecking = true;
   this.cartService.getCartData(this.authService.userToken).subscribe(
      response => {
        for(let i = 0; i < response.length; i++)
        {
          if(response[i].productId === this.id)
          {
            if(response[i].variationName === this.variation)
            {
              if(response[i].size === this.itemSize)
              {
                if(this.stock >= this.productItem.noItem + response[i].noItem)
                {
                  return this.cartUpdater(i, response[i].noItem);
                }
                else{
                  this.error = "Amount of item to be added will exceed maximum supply!";
                  this.isChecking = false;
                  return;
                }
              }
            }
          }
        }
        this.cartAdder();
        this.isChecking = false;
      }
    );
  }

  cartAdder(){
    this.message = null;
    this.isLoading = true;
    this.productItem.productImages = this.product.productImages[0];
    this.productItem.productName = this.product.name;
    this.productItem.productId = this.id;
    
    this.productService.addProduct(new ProductDataModel(
      this.productItem.productImages,
      this.productItem.productName,
      this.productItem.productId,
      this.productItem.variationName,
      this.productItem.size,
      this.productItem.price,
      this.productItem.noItem
    ));
    
    console.log(this.productService.getProductsData());
    this.cartService.putCartData(this.authService.userToken).subscribe(response=>
      {
        this.message = "Added Successfully!"
        this.router.navigate(['/shopping-cart']);
      }); 
  }


  cartUpdater(indexNumber: number, existingCartProduct: number){
    this.message = null;
    this.isLoading = true;
    this.productItem.productImages = this.product.productImages[0];
    this.productItem.productName = this.product.name;
    this.productItem.productId = this.id;
    this.productItem.noItem += existingCartProduct;
    
    this.productService.updateProduct(indexNumber, new ProductDataModel(
      this.productItem.productImages,
      this.productItem.productName,
      this.productItem.productId,
      this.productItem.variationName,
      this.productItem.size,
      this.productItem.price,
      this.productItem.noItem
    ));
    
    console.log(this.productService.getProductsData());
    this.cartService.putCartData(this.authService.userToken).subscribe(response=>
      {
        this.message = "Added Successfully!"
        this.router.navigate(['/shopping-cart']);
      }); 
  }

} 
  
  

