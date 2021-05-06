import { EmailSendingService } from './../../service/email-sending.service';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/service/products.service';
import { OrdersFirebaseService } from './../../service/orders-firebase.service';
import { map,take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-topay',
  templateUrl: './order-topay.component.html',
  styleUrls: ['./order-topay.component.css']
})
export class OrderTopayComponent implements OnInit {
  product$;
  public isCollapsed = true;
  UIDdata : any
  orders : any
  isLoading = false;
  isOrderEmpty = false;
  errorProduct: any[];
updateProductKey: any;
updateProductValues: any;
tempProducts : any[];
tempkeys : any [];

  constructor( private ordersService : OrdersFirebaseService,
               private modalService: NgbModal,
               private firebaseproductservice: FirebaseProductsService,
               private emailService: EmailSendingService ) { 
   // this.product$ = this.productsService.getToPay();
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

  this.ordersService.getStatusOrder('To Pay').snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(datas => {
    this.orders = datas; 
    console.log(this.orders)

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
        console.log(this.UIDdata)
      
    }}
    console.log(this.UIDdata.receiptImage == undefined)
  }

  orderCancel(key:string) {
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
              // console.log(this.tempProducts[k] )
               tempName = this.orders[i].orderProduct[j].productName
              // console.log(this.orders[i].orderProduct[j].productName)
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
         //console.log(this.updateProductKey[i])
         console.log(this.updateProductValues[i])
         this.firebaseproductservice.updateProduct(this.updateProductKey[i], this.updateProductValues[i])
       } 

      this.ordersService.getOrderKey(key).update(key,{ orderStatus: "Cancelled"});
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
            //console.log(data.productVariation[i].variationName )
            variationProduct = data.productVariation[i].variationName;
            for(var j in data.productVariation[i].variationDetail) {
              if(data.productVariation[i].variationDetail[j].size == size ) {
                sizeProduct = data.productVariation[i].variationDetail[j].size
                data.productVariation[i].variationDetail[j].stock += noItems;

                if(data.productVariation[i].variationDetail[j].stock <= 10) {
                  this.emailService.sendNotif(name, variation, size, data.productVariation[i].variationDetail[j].stock).subscribe();
                }
    
                data.soldProducts -= noItems;
                data.totalStock += noItems; 
                this.updateProductKey.push( key)
                this.updateProductValues.push(data)
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