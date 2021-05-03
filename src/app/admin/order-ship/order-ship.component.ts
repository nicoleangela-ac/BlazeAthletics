import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { map,take } from 'rxjs/operators';
import {FirebaseProductsService} from './../../service/firebase-products.service'
import { EmailSendingService } from 'src/app/service/email-sending.service';

@Component({
  selector: 'app-order-ship',
  templateUrl: './order-ship.component.html',
  styleUrls: ['./order-ship.component.css']
})
export class OrderShipComponent implements OnInit {

  public isCollapsed = true;
  key$;
  UIDdata : any
  orders : any
  product$: any
  productdata: any
  variation: any
  errorProduct: any[];
  updateProductKey: any;
  updateProductValues: any;
  tempProducts : any[];
  tempkeys : any [];
   singleProduct: any;
   isLoading = false;
   isOrderEmpty = false;
  
   constructor(private productService: ProductsService,
              private ordersService : OrdersFirebaseService,
              private modalService: NgbModal,private db: AngularFireDatabase,
              private firebaseproductservice: FirebaseProductsService,
              private emailService: EmailSendingService) {
                this.isLoading = true;
                this.isOrderEmpty = false;
              }
  
   ngOnInit() {
    this.UIDdata = [];
    this.errorProduct = [];
    this.updateProductKey = [];
    this.updateProductValues = [];
    this.tempProducts = [];
    this.tempkeys= [];
    this.ordersService.getStatusOrder('To Ship').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(datas => {
      
      this.orders = datas;   
      if(datas.length != 0) {
        this.tempProducts.slice()
        var tempId = this.orders[0].orderProduct[0].productId
        this.getItem(tempId)
        for (var i in this.orders ) {
            for (var j in this.orders[i].orderProduct) {
              if(tempId != this.orders[i].orderProduct[j].productId  ) {
                this.getItem(this.orders[i].orderProduct[j].productId)
              }
              }  
            
          }      
      } 
      this.isLoading = false
      if(this.orders.length == 0 ) {
        this.isOrderEmpty = true
      }
  
    });
   }
  
  
  openVerticallyCentered(content, UID:string) {
    this.UIDdata.pop();
    this.modalService.open(content, { centered: true });
    for(var i in this.orders ) {
      if (UID == this.orders[i].key){
        this.UIDdata.push(this.orders[i] )
      // console.log(this.orders)
      // console.log(this.orders[i].orderProduct[i].productName)
      }
    } 
    
  }
   
  update(key:string, value, error?){
    if (value == "Cancelled" ) {
     this.errorProduct.splice(0, this.errorProduct.length);
     this.updateProductKey.splice(0, this.updateProductKey.length);
     this.updateProductValues.splice(0, this.updateProductValues.length);  
      var tempName ;
      for (var i in this.orders ) {
        if (this.orders[i].key == key) {
          console.log( this.orders[i].orderProduct) //customer order
  
          for (var j in this.orders[i].orderProduct) {
        //  console.log(this.getItem(this.orders[i].orderProduct[j].productId)) 
            for(var k in this.tempProducts) {
              console.log(this.tempProducts )
              
              if(this.tempProducts[k].name == this.orders[i].orderProduct[j].productName) {
                console.log(this.tempProducts[k] )
                tempName = this.orders[i].orderProduct[j].productName
                console.log(this.orders[i].orderProduct[j].productName)
                this.checkProductAvailability( 
                            this.tempProducts[k],
                            this.orders[i].orderProduct[j].productName ,
                            this.orders[i].orderProduct[j].productVariation, 
                            this.orders[i].orderProduct[j].productSize,
                            this.orders[i].orderProduct[j].productId,
                            this.orders[i].orderProduct[j].noItems )            
              }
            
            }
            if (tempName == null) {
              var pName = "Product has been changed" 
              this.errorProduct.push(pName);
            } 
            }  
        }
      }
  
     // if(this.errorProduct.length <=  0) {
        for (var i in this.updateProductKey ) {
          console.log(this.updateProductKey[i])
          console.log(this.updateProductValues[i])
          this.firebaseproductservice.updateProduct(this.updateProductKey[i], this.updateProductValues[i])
        }
           this.ordersService.getOrderKey(key).update(key,{orderStatus: value})
           this.modalService.dismissAll();      
     // }
     /* else{
        console.log(this.errorProduct)
        this.modalService.dismissAll();
       // this.errorMessage(error);     
      } */   
    }
    else {
      this.ordersService.getOrderKey(key).update(key,{orderStatus: value})
      this.modalService.dismissAll();
    }
  }
  
  checkProductAvailability ( data, name, variation, size, key, noItems) {
  
    var variationProduct : any;
    var sizeProduct : any;
  
  
      if (data != null) {
          for(var i in data.productVariation) {
           /* console.log(data)
            console.log(data.productVariation[i].variationName )
            console.log(variation) */
            if(data.productVariation[i].variationName == variation) {
              console.log(data.productVariation[i].variationName )
                variationProduct = data.productVariation[i].variationName;
              for(var j in data.productVariation[i].variationDetail) {
                if(data.productVariation[i].variationDetail[j].size == size ) {
                  sizeProduct = data.productVariation[i].variationDetail[j].size
                    /*  if (data.productVariation[i].variationDetail[j].stock < noItems ) {
                        var pStock = name +" , Insufficient Stock"
                        this.errorProduct.push(pStock)
                      } */
                      
                      //else {
                        data.productVariation[i].variationDetail[j].stock += noItems;
  
                        if(data.productVariation[i].variationDetail[j].stock <= 10)
                        {
                          this.emailService.sendNotif(name, variation, size, data.productVariation[i].variationDetail[j].stock).subscribe();
                        }
  
                        data.soldProducts -= noItems;
                        data.totalStock += noItems; 
                        this.updateProductKey.push( key)
                        this.updateProductValues.push(data)
                      //} 
                    } 
                  } 
                }
                
              }
              if (variationProduct == null  ) {
                var pVariation = name +" , " + variation + " Not Available"
                this.errorProduct.push(pVariation)        
              }
              else if (sizeProduct == null) {
                var pSize = name +" , " + size + " Not Available"
                this.errorProduct.push(pSize)
              }                  
      }
      else {
            var pName = "Product " + name + " Not Available" 
            this.errorProduct.push(pName);       
      }
  
    } 
    getItem(key) {
      this.firebaseproductservice.getSingleProduct(key).valueChanges().subscribe(data => {
        this.tempProducts.push(data)
         } ); 
    }
  
      errorMessage(content) {
        this.modalService.open(content, { centered: true });
      }
  
  }
  
  