import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { map,take } from 'rxjs/operators';
import {FirebaseProductsService} from './../../service/firebase-products.service'



@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.css']
})
export class OrderPendingComponent implements OnInit {
 
  public isCollapsed = true;
key$;
UIDdata : any
orders : any
product$: any
productdata: any
variation: any
errorProduct: any[];
updateProductKey: any[];
updateProductValues: any[];
 constructor(private productService: ProductsService,
            private ordersService : OrdersFirebaseService,
            private modalService: NgbModal,private db: AngularFireDatabase, private firebaseproductservice: FirebaseProductsService) {
 }

 ngOnInit() {
  this.UIDdata = [];
  this.errorProduct = [];
  this.updateProductKey = [];
  this.updateProductValues = [];
  this.ordersService.getStatusOrder('Pending').snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(datas => {
    this.orders = datas; 
  //  console.log(this.orders)
  });

  
 }


openVerticallyCentered(content, UID:string) {
  this.UIDdata.pop();
  this.modalService.open(content, { centered: true });
  for(var i in this.orders ) {
    if (UID == this.orders[i].key){
      this.UIDdata.push(this.orders[i] )
    // console.log(this.orders)
    //  console.log(this.orders[i].orderProduct[i].productName)
    }
  } 
  
}
  /*
  this.modalService.open(content, { centered: true });
  this.ordersService.getOrderKey(UID).snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(datas => {
    this.UIDdata = datas; 
    console.log(this.UIDdata)
  });
  */
 

update(key:string, value, error?){
  if (value == "For Delivery" ) {
   this.errorProduct.splice(0, this.errorProduct.length);
   // this.updateProductKey.splice(0, this.updateProductKey.length);
    //this.updateProductValues.splice(0, this.updateProductValues.length);  

    for (var i in this.orders ) {
    // console.log( this.orders[i].key)
      if (this.orders[i].key == key) {
        console.log( this.orders[i].orderProduct)

      for (var j in this.orders[i].orderProduct) {
      //  console.log(this.orders[i].orderProduct[j].productId)
      console.log(this.orders[i].orderProduct.length)
        this.checkProductAvailability( this.orders[i].orderProduct[j].productName ,this.orders[i].orderProduct[j].productVariation, this.orders[i].orderProduct[j].productSize, this.orders[i].orderProduct[j].productId, this.orders[i].orderProduct[j].noItems )
      //  this.updateProductKey.push(this.orders[i].orderProduct[j].productId); 
      }    
      }

    }

    if(this.errorProduct.length <=  0 ) {
      console.log(this.updateProductKey.toString())
      console.log(this.updateProductValues)
     // console.log( this.updateProductValues[0]) 
     setTimeout(() => {
      for( var i in this.updateProductKey) {
    //    console.log()
        console.log( this.updateProductValues[i] )
      //  this.firebaseproductservice.updateProduct(this.updateProductKey[i], this.updateProductValues[i] );
      }
    })

      
     // this.ordersService.getOrderKey(key).update(key,{orderStatus: value})
      this.modalService.dismissAll();
    }
    else{
      console.log(this.errorProduct)
      this.modalService.dismissAll();
      this.errorMessage(error);
      
    }    
  }
  else {
    this.ordersService.getOrderKey(key).update(key,{orderStatus: value})
    this.modalService.dismissAll();
  }
}



checkProductAvailability ( name, variation, size, key, noItems) {
//  this.isValid = false;
 // this.isTrue = false;
 var singleProduct: any;
 var variationProduct : any;
 var sizeProduct : any;
  this.firebaseproductservice.getSingleProduct(key).valueChanges().subscribe(data => {
    singleProduct = data;  
 //   this.isLoad = false;
// console.log( data)
 if (data != null) {
   if (name == singleProduct.name) {
    for(var i in singleProduct.productVariation) {
    //  console.log(singleProduct.productVariation )
      if(singleProduct.productVariation[i].variationName == variation) {
     //   console.log( singleProduct.productVariation[i].variationName)
          variationProduct = singleProduct.productVariation[i].variationName;
        for(var j in singleProduct.productVariation[i].variationDetail) {
          if(singleProduct.productVariation[i].variationDetail[j].size == size ) {
            sizeProduct = singleProduct.productVariation[i].variationDetail[j].size
           // console.log( singleProduct.productVariation[i].variationDetail[j].size)

                if (singleProduct.productVariation[i].variationDetail[j].stock < noItems ) {
                  var pStock = name +" , Insufficient Stock"
                  this.errorProduct.push(pStock)
                }
                else {
                  singleProduct.productVariation[i].variationDetail[j].stock -= noItems;
                  singleProduct.soldProducts += noItems;
                  singleProduct.totalStock -= noItems;
                 // console.log(singleProduct)
                  this.updateProductValues.push(singleProduct);
                  this.updateProductKey.push(key)

                }
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
    var pName = "Product " + name + " has been changed" 
    this.errorProduct.push(pName); 
   }           
 }
 else {
      var pName = "Product " + name + " Not Available" 
      this.errorProduct.push(pName);       
 }
  } );  } 

  errorMessage(content) {
    this.modalService.open(content, { centered: true });
  }

}

